import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthGroup } from '../_models/authorization.types';
import { AuthorizationDataService } from './authorization-data.service';
//import 'rxjs/add/operator/toPromise';
//import 'rxjs/add/operator/map';

@Injectable()
export class AuthorizationService {
  permissions?: Array<string> ; // Store the actions for which this user has permission
  
  constructor(private authorizationDataService: AuthorizationDataService) { }
  hasPermission(authGroup: AuthGroup) {
    if (this.permissions && this.permissions.find(permission => {
      return permission.toUpperCase() === authGroup.toUpperCase();
    })) {
      return true;
    }
    return false;
  }


  // This method is called once and a list of permissions is stored in the permissions property
  initializePermissions() {

    return new Promise((resolve, reject) => {
      // Call API to retrieve the list of actions this user is permitted to perform.
      // In this case, the method returns a Promise, but it could have been implemented as an Observable
      this.authorizationDataService.getPermissions().toPromise()
        .then(permissions => {
          this.permissions = permissions;
          resolve('');
        })
      .catch ((e) => {
        reject(e);
      });
    });
  }


  async isAuthorized(authGroup: AuthGroup) {
    debugger;
    await this.authorizationDataService.getPermissions().subscribe(perm => {
      if (perm && perm.find(_perm => {
        return _perm.toUpperCase() === authGroup.toUpperCase();
      })) {
        return true;
      }
      return false;
    });
  }
  

}
