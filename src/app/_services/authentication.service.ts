import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AlertService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username: username, password: password })
      .subscribe(user => {
        if(user){
           if(user.status==1){
                          this.alertService.error("Invalid UserName/Password");
  
                      }else if(user.status==2){
                          this.alertService.error("Invalid Password");
                      }else if(user.status==3){
                          this.alertService.error("User locked , please contract administartor");
                      }
                     
        // login successful if there's a jwt token in the response
      else if (user.currentUser && user.currentUser.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          
          localStorage.setItem('currentUser', JSON.stringify(user.currentUser));
          localStorage.setItem('usermenu', JSON.stringify(user.userMenu));
          localStorage.setItem('userpermission', user.userPermission);
          this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
        }

       }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('usermenu');
    localStorage.removeItem('userpermission');
  }
}
