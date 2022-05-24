import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserAccessModel } from '../models/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiPath: string;

  constructor(private http: HttpClient) {
    this.apiPath = environment.path;
  }

  public attempAccess(loginData: UserAccessModel): Observable<any> {
    return this.http.post(this.apiPath + "user/access", loginData);
  }

}
