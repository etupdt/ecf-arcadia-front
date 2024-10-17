import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { IAuth } from '../interfaces/IAuth';
import { catchError, interval, Observable, of, Subscription, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastsService } from './toasts.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import { ApiService } from './api.service';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    user: User = new User()
    signalUser = signal(this.user)
    
    intervals$: Observable<number> = interval(2000)
    subscription!: Subscription
    
    helper = new JwtHelperService();
    
    endWarning: boolean = false
    
    constructor(
        private http: HttpClient,
        private toastsService: ToastsService,
        private modalService: NgbModal,
        private headerService: HeaderService,
        private router: Router,
		private userService: ApiService<User>,
    ) {
        this.subscription = this.intervals$.subscribe(n => this.verifyConnection(n))
    }
    
    register(auth: IAuth): any {

        return this.http.post<IAuth>(
            environment.useBackend + `/auth/register`,
            auth
        )

    }

    authenticate(auth: IAuth): Observable<any> {
        return this.http.post<any>(
            environment.useBackend + `/auth/authenticate`, 
            auth
        ).pipe(
            tap((res: any) => {
                localStorage.setItem('access_token', res.access_token)
                localStorage.setItem('refresh_token', res.refresh_token)
                this.userService.getItem('users', this.helper.decodeToken(res.access_token).id).subscribe({
                    next: (res: User) => {
                        this.user = res
                        this.endWarning = false
                    }    
                })
            })
        )

    }

    refreshToken(request?: HttpRequest<any>, next?: HttpHandlerFn): Observable<any> {
        return this.http.post<any>(
            environment.useBackend + `/auth/refresh-token`,
            {},
            {'headers': new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem('refresh_token')}`)}
        ).pipe(
            tap((res: any) => {
                localStorage.setItem('access_token', res.access_token)
                localStorage.setItem('refresh_token', res.refresh_token)
                this.endWarning = false
                this.toastsService.toastRefresh = false
                this.toastsService.show('Votre connexion a été prolongée !', 3000)
            }),
            catchError((error) => {
                this.logout()
                this.toastsService.show('Erreur de connexion ou connexion expirée, veuillez réessayer de vous reconnecter !', 3000)
                throw error;
            })
        )
    }

    handleRefreshResponse(request: HttpRequest<any>, next: HttpHandlerFn) {

    }

    logout = () => {

        this.user = new User()
        this.signalUser.set(this.user)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        
        if (this.headerService.selectedSubMenuItem !== '') {
            this.router.navigate(['Accueil'])
        }

    }

    verifyConnection(num: number) {

        let access_token: any
        let refresh_token: any

        try {
            access_token = this.helper.decodeToken(localStorage.getItem('access_token')!)
            refresh_token = this.helper.decodeToken(localStorage.getItem('refresh_token')!)
            if (access_token) {
                if (Date.now() > access_token.exp * 1000) {
                    if (Date.now() > refresh_token.exp * 1000) {
                        this.toastsService.toastRefresh = false
                        this.toastsService.show('Connexion expirée !', 3000)
                        this.endWarning = false
                        this.logout()
                    } else {
                        if (Date.now() > (refresh_token.exp - 34) * 1000 && !this.endWarning) {
                            this.endWarning = true
                            this.toastsService.toastRefresh = true
                        } else {
                            if (this.user.id === 0) {
                                this.userService.getItem('users', access_token.id).subscribe({
                                    next: (res: User) => {
                                        this.user = res
                                    }    
                                })
                            }
                        }
                    }
                }
            }
        } catch {
            this.logout()
        }
        
    }

}
