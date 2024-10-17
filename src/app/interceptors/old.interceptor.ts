import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { catchError, defer, map, Observable, of, retry, switchMap, tap, timer } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class OldInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private modalService: NgbModal,
    ) {}

    private isRefreshing = false;
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let access_token: string = ""
    
        try {
            access_token = localStorage.getItem('access_token')!
        } catch (error: any) {
            if (localStorage.getItem('access_token')) {
                localStorage.removeItem('access_token')
            }    
        }    
        
        if (access_token && !req.url.match(/\/auth\/refresh-token$/)) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${access_token}`
                }
            })    
        }    
        
        return next.handle(req).pipe(

            catchError((error) => {
                if (!req.url.match(/\/auth\/(refresh-token|authenticate)$/) &&
                    error instanceof HttpErrorResponse &&
                    error.status === 401
                ) {
                    return this.handle401Error(req, next);
                } else {
                    this.displayErrorMessage(error)
                }
        
                throw error
            })

        )
    }
      
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

        if (!this.isRefreshing) {

            this.isRefreshing = true;

            return this.authService.refreshToken().pipe(
                switchMap(() => {
                    this.isRefreshing = false;

                    let access_token: string = ""

                    try {
                        access_token = localStorage.getItem('access_token')!
                    } catch (error: any) {
                        if (localStorage.getItem('access_token')) {
                            localStorage.removeItem('access_token')
                        }    
                    }    
                    
                    const req = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${access_token}`
                        }
                    })

                    return next.handle(req);
                }),
                catchError((error) => {
                    this.isRefreshing = false;

                    throw error
                })
            );

        }

        return next.handle(request);

    }
        
    private displayErrorMessage(error: HttpErrorResponse) {

        let message: string = ''

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
    
        const modal = this.modalService.open(ErrorModalComponent)
        modal.componentInstance.message = message;
    
    }

}
