import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    
    console.log('req', req)
    const userTokens = localStorage.getItem('arcadia_tokens'); 
    const modifiedReq = userTokens ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${JSON.parse(userTokens)['access_token']}`),
    }) : req
   
    return next(modifiedReq)

}
