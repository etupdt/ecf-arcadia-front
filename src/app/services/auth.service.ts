import { HttpClient, HttpEvent, HttpHandler, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { IAuth } from '../interfaces/IAuth';
import { catchError, interval, Observable, Subscription, switchMap, tap, throwError } from 'rxjs';
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

    refreshToken(): Observable<any> {

        return this.http.post(
            environment.useBackend + `/auth/refresh-token`,
            null,
            {'headers': new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem('refresh_token')}`)}
        ).pipe(
            tap((res: any) => {
                localStorage.setItem('access_token', res.access_token)
                localStorage.setItem('refresh_token', res.refresh_token)
                this.endWarning = false
                this.toastsService.show('Votre connexion a été prolongée !', 2000)
            }),
            catchError((error) => {
                this.logout()
                this.toastsService.show('Erreur de connexion ou connexion expirée, veuillez réessayer de vous reconnecter !', 2000)
                throw error;
            })
        )

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
                        this.toastsService.show('Connexion expirée, veuillez réessayer de vous reconnecter !', 2000)
                        this.logout()
                    } else {
                        if (Date.now() > (refresh_token.exp - 10) * 1000 && !this.endWarning) {
                            this.endWarning = true
                            this.toastsService.show('Votre connexion va bientôt expirer !', 6000)
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

    displayErrorMessage(status: number) {

        let message: string = ''

        switch (status) {
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
    
    }}
