import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationDataService {
  constructor(private http: HttpClient) { }

  getPermissions(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${environment.apiUrl}/User/Permissions`);
  }
 
}
