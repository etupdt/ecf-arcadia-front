import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { IToken } from '../interfaces/IToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HeaderService } from '../services/header.service';
import { ElementRef, inject } from '@angular/core';
import { User } from '../models/User';
import { catchError, tap } from 'rxjs';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    
    const helper = new JwtHelperService();
    const headerService: HeaderService = inject(HeaderService);

    const localUserTokens: string = localStorage.getItem('arcadia_tokens')!

    let modifiedReq

    if (localUserTokens) {
        const userTokens: IToken = JSON.parse(localUserTokens)
        if (Date.now() > helper.decodeToken(userTokens.access_token).exp * 1000) {
            headerService.user = new User()
            headerService.signalUser.set(headerService.user)
            localStorage.removeItem('arcadia_tokens')
            modifiedReq = req
        } else {
            modifiedReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${userTokens.access_token}`),
            })
        }
    } else {
        modifiedReq = req
    }
   
    return next(modifiedReq).pipe(
        // tap(event=> console.log('event', event)),
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

            document.getElementById('errorModal')!.style.display = 'block'
            document.getElementById('errorMessage')!.innerText = message
            // headerService.modal = {modal: 'error', message: message, display: "display: block;"}
            // headerService.signalModal.set(headerService.modal)
    
            throw error

        })
    )

}
