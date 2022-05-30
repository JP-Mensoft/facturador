import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyModel } from '../models/companyModel';
import { UserSetModel } from '../models/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiPath: string;

  constructor(
    private _http: HttpClient
  ) {
    this.apiPath = environment.path;
  }

  public getUserCompany(token: string): Observable<any> {
    return this._http.get(this.apiPath + "company/usercompany", { 'headers': { token } });
  }

  public getUser(token: string): Observable<any> {
    return this._http.get(this.apiPath + "user/getone", { 'headers': { token } });
  }

  public setUserData(token: string, userData: UserSetModel): Observable<any> {
    return this._http.put(this.apiPath + "user/set", userData, { 'headers': { token } });
  }

  public setUserCompany(token: string, companyData: CompanyModel): Observable<any> {
    return this._http.post(this.apiPath + "company/set", companyData, { 'headers': { token } });
  }

}
