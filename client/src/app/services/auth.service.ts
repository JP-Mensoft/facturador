import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserAccessModel, UserSetModel } from '../models/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiPath: string;

  constructor(
    private _http: HttpClient
  ) {
    this.apiPath = environment.path;
  }

  public attempAccess(loginData: UserAccessModel): Observable<any> {
    return this._http.post(this.apiPath + "user/access", loginData);
  }

  public checkToken(token: string): Observable<any> {
    return this._http.get(this.apiPath + "user/checktoken", { 'headers': { token } });
  }

  public addUser(userData: UserSetModel): Observable<any> {
    return this._http.post(this.apiPath + "user/add", userData);
  }

}
