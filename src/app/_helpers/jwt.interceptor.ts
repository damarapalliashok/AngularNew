import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '../_services/authorization.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router, 
        private route: ActivatedRoute,
        protected authorizationService: AuthorizationService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if 
       
        let currentUser = localStorage.getItem('currentUser')!=null? JSON.parse(localStorage.getItem('currentUser')??""):"";
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }else if(request.url!=null && !request.url.endsWith('users/authenticate')){
            this.router.navigate(['/unauthorized']);
           
        }

        return next.handle(request);
    }
}