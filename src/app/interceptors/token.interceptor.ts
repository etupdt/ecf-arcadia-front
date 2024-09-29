import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { inject } from '@angular/core';
import { catchError, switchMap, tap } from 'rxjs';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { ToastsService } from '../services/toasts.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    
    const helper = new JwtHelperService();
    const authService: AuthService = inject(AuthService);
    const modalService: NgbModal = inject(NgbModal)
    const toastsService: ToastsService = inject(ToastsService)
    
    let access_token
    
    try {
        access_token = localStorage.getItem('access_token')
    } catch (error: any) {
        if (localStorage.getItem('access_token')) {
            localStorage.removeItem('access_token')
        }    
    }    
    
    let modifiedReq = req

    if (access_token) {
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
                        authService.refreshToken().pipe(
                            switchMap((res: any) => {
                                return next(req.clone({
                                    setHeaders: {
                                      Authorization: `Bearer ${res.access_token}`
                                    }
                                }))
                            })
                        )
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
