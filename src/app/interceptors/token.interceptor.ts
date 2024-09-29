import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { inject } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { ToastsService } from '../services/toasts.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    
    const helper = new JwtHelperService();
    const authService: AuthService = inject(AuthService);
    const modalService: NgbModal = inject(NgbModal)
    const toastsService: ToastsService = inject(ToastsService)

    let tokens

    try {
        tokens = JSON.parse(localStorage.getItem('arcadia_tokens')!)
    } catch (error: any) {
        if (localStorage.getItem('arcadia_tokens')) {
            localStorage.removeItem('arcadia_tokens')
        }
    }
    
    console.log('aller', req.url)

    let modifiedReq = req

    if (tokens) {
        if (Date.now() > helper.decodeToken(tokens.access_token).exp * 1000) {
            localStorage.removeItem('arcadia_tokens')
            authService.refreshToken(tokens.refresh_token).subscribe({
                next: (res: any) => {
                    localStorage.setItem('arcadia_tokens', JSON.stringify(res))
                    toastsService.show('Votre connexion a été prolongée !', 2000)
                    modifiedReq = req.clone({
                        headers: req.headers.set('Authorization', `Bearer ${res.access_token}`),
                    })
                    console.log(modifiedReq.url, modifiedReq.headers)
                    authService.endWarning = false
                },
                error: (error: any) => {
                    authService.logout()
                    toastsService.show('Erreur de connexion ou connexion expirée, veuillez réessayer de vous reconnecter !', 2000)
                    throw error
                }
            })
        } else {
            modifiedReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${tokens.access_token}`),
            })
        }
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
                        message = 'Email ou password incorrect !'
                        break;
                    }
                    case 403: {
                        message = 'Habilitations insuffisantes pour effectuer cette opération !'
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

            const modal = modalService.open(ErrorModalComponent)
            modal.componentInstance.message = message;

            throw error

        })
    )

}
