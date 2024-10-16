import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { inject } from '@angular/core';
import { catchError, retry, tap, timer } from 'rxjs';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    
    const helper = new JwtHelperService();
    const authService: AuthService = inject(AuthService);
    const modalService: NgbModal = inject(NgbModal)

    let isRefresh: boolean = false

    let access_token: string = ""
    
    try {
        access_token = localStorage.getItem('access_token')!
    } catch (error: any) {
        if (localStorage.getItem('access_token')) {
            localStorage.removeItem('access_token')
        }    
    }    
    
    let modifiedReq = req

    if (access_token && !req.url.match(/\/auth\/refresh-token$/)) {
        modifiedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${access_token}`
            }
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
                                next: (res: any) => {
                                    const req: HttpRequest<any> = modifiedReq.clone({
                                        setHeaders: {
                                            Authorization: `Bearer ${access_token}`
                                        }
                                    })
                                    return next(req).pipe(
                                        tap((r: any)  => console.log('pipe apres resend')))
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
