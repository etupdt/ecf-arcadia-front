import { HttpInterceptorFn } from '@angular/common/http';
import { IToken } from '../interfaces/IToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HeaderService } from '../services/header.service';
import { inject } from '@angular/core';
import { User } from '../models/User';

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
        }
        modifiedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${userTokens.access_token}`),
        })
    } else {
        modifiedReq = req
    }
   
    return next(modifiedReq)

}
