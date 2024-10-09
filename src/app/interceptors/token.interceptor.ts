import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { inject } from '@angular/core';
import { catchError, retry, switchMap, tap } from 'rxjs';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { ToastsService } from '../services/toasts.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    
    const helper = new JwtHelperService();
    const authService: AuthService = inject(AuthService);
    const modalService: NgbModal = inject(NgbModal)

    let reqSave = req.clone()

    let access_token
    
    try {
        access_token = localStorage.getItem('access_token')
    } catch (error: any) {
        if (localStorage.getItem('access_token')) {
            localStorage.removeItem('access_token')
        }    
    }    
    
    let modifiedReq = req

    if (access_token && !req.url.match(/\/auth\/refresh-token$/)) {
        modifiedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${access_token}`),
        })    
    }    
    
    return next(modifiedReq).pipe(
        tap((r: any)  => console.log('retour', r.url)),
        catchError((error: HttpErrorResponse) => {

            let message: string = ''

            if (error) {
                switch (error.status) {
                    case 400: {
                        message = 'Erreur 400 !'
                        break;
                    }
                    case 401: {
                        message = ''
                        if (req.url.match(/\/auth\/(refresh-token|authenticate)$/)) {
                            message = error.error.message
                        } else {
                            // authService.refreshToken(next, req.clone())
                            authService.refreshToken().subscribe({
                                    next: (resRefresh: any) => {
                                    console.log('res', resRefresh)
                                    console.log('reqsave', reqSave)
                                    console.log('next', next)
                                    return next(reqSave.clone({
                                        setHeaders: {
                                            Authorization: `Bearer ${resRefresh.access_token}`
                                        }
                                    })).pipe(
                                        catchError((error: HttpErrorResponse) => {
                                            console.log('errror sur retry', error)
                                            throw error
                                        })
                                    )
                                }
                            })
                        }
                        break;
                    }
                    case 403: {
                        message = "Vous n'êtes pas habilité à effectuer cette opération"
                        break;
                    }
                    case 500: {
                        message = 'Erreur du serveur !'
                        break;
                    }
                    case 0: {
                        message = 'Application indisponible !' 
                        break;
                    }   
                    default: {
                        message = 'Application indisponible !' 
                        break;
                    }   
                }
            }
        
            if (message !== '') {
                const modal = modalService.open(ErrorModalComponent)
                modal.componentInstance.message = message;
            }

            throw error
    
        })

    )
       
}
