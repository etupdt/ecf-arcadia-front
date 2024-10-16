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

@Injectable()
export class OldInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
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
        
}
