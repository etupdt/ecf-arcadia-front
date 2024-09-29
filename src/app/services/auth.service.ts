import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { IAuth } from '../interfaces/IAuth';
import { interval, Observable, Subscription, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastsService } from './toasts.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import { ApiService } from './api.service';

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

    authenticate(auth: IAuth): any {

        return this.http.post<IAuth>(
            environment.useBackend + `/auth/authenticate`,
            auth
        )

    }

    refreshToken(refresh_token: string): any {

        return this.http.post(
            environment.useBackend + `/auth/refresh-token`,
            null,
            {'headers': new HttpHeaders().append('Authorization', `Bearer ${refresh_token}`)}
        )

    }

    logout = () => {

        this.user = new User()
        this.signalUser.set(this.user)
        localStorage.removeItem('arcadia_tokens')
        
        if (this.headerService.selectedSubMenuItem !== '') {
            this.router.navigate(['Accueil'])
        }

    }

    verifyConnection(num: number) {

        let access_token: any
        let refresh_token: any
        let jsonTokens

        try {
            jsonTokens = JSON.parse(localStorage.getItem('arcadia_tokens')!)
            access_token = this.helper.decodeToken(jsonTokens.access_token)
            refresh_token = this.helper.decodeToken(jsonTokens.refresh_token)
            if (access_token) {
                if (Date.now() > access_token.exp * 1000) {
                    if (Date.now() > refresh_token.exp * 1000) {
                        this.toastsService.show('Connexion expirée, veuillez réessayer de vous reconnecter !', 2000)
                        localStorage.removeItem('arcadia_tokens')
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
            if (jsonTokens) {
                localStorage.removeItem('arcadia_tokens')
                this.logout()
            }
        }
        
    }

}
