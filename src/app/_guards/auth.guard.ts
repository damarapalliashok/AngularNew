import { Injectable } from '@angular/core';
import { Router,ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '../_services/authorization.service';
import { AuthGroup } from '../_models/authorization.types';

@Injectable()
export class AuthGuard implements CanActivate {
  isperm: boolean;

  constructor(private router: Router, 
    private route: ActivatedRoute,
    protected authorizationService: AuthorizationService) { }
//add
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (localStorage.getItem('currentUser') && route["data"]!=null) {
      const userperm =localStorage.getItem('userpermission')!=null? localStorage.getItem('userpermission'):"";
      if(route["data"].title=="Dashboard"){
        return true;
      }
      this.isperm =route["data"].perm!=undefined && userperm!=null?userperm.split(',').findIndex(p => p.toLowerCase().trim() == route["data"].perm.toLowerCase().trim()) > 0:false;
        // logged in so return true
      if(this.isperm) { 
         // this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
          return true;
        } else{// not logged in so redirect to login page with the return url
          this.router.navigate(['/unauthorized']);
          return false;  
        }
      }
        else{// not logged in so redirect to login page with the return url
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
   
    }
  protected hasRequiredPermission(authGroup: AuthGroup): Promise<boolean> | boolean {
    //debugger;
    // If user’s permissions already retrieved from the API
 
    if (this.authorizationService.permissions) {
      if (authGroup) {
        return this.authorizationService.hasPermission(authGroup);
      } else {
       // return this.authorizationService.hasPermission("");
       return false;
      }
    } else {
      // Otherwise, must request permissions from the API first
      const promise = new Promise<boolean>((resolve, reject) => {
        this.authorizationService.initializePermissions()
          .then(() => {
            if (authGroup) {
              resolve(this.authorizationService.hasPermission(authGroup));
              return this.authorizationService.hasPermission(authGroup);
            } else {
             // resolve(this.authorizationService.hasPermission(''));
             return false;
            }

          }).catch((e) => {
            console.log(e);
            resolve(false);
          });
      });
     // return promise;
     return false;

    }
  }
}



//reference
//https://blogs.msdn.microsoft.com/premier_developer/2018/03/07/angular-how-to-implement-role-based-security/
