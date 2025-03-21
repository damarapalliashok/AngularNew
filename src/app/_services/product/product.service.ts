import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';




@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {

  }

  getUserMenus() {
    return this.http.get<any>(`${environment.apiUrl}/User/Menus`);
  }
  getProduct(roleid: string) {
    return this.http.get<any>(`${environment.apiUrl}/Menus?roleid=` + roleid);
  }
  getRoles() {
    return this.http.get<any>(`${environment.apiUrl}/Roles`);
  }

  updatePermissions(roleid, request) {
    return this.http.put(`${environment.apiUrl}/Product/Permission/Update/` + roleid, request);
  }

}


