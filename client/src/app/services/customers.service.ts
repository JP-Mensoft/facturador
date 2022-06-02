import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerModel } from '../models/customerModel';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiPath: string;

  constructor(
    private _http: HttpClient
  ) {
    this.apiPath = environment.path;
  }

  public getOneCustomer(token: string, customerId: number): Observable<any> {
    return this._http.get(this.apiPath + "customer/getone/" + customerId, { 'headers': { token } });
  }

  public getAllCustomers(token: string): Observable<any> {
    return this._http.get(this.apiPath + "customer/getall", { 'headers': { token } });
  }

  public addCustomer(token: string, customer: CustomerModel): Observable<any> {
    return this._http.post(this.apiPath + "customer/add", customer, { 'headers': { token } });
  }

  public setCustomer(token: string, customer: CustomerModel): Observable<any> {
    return this._http.put(this.apiPath + "customer/set", customer, { 'headers': { token } });
  }

  public deleteCustomer(token: string, customerId: number): Observable<any> {
    return this._http.delete(this.apiPath + "customer/delete/" + customerId, { 'headers': { token } });
  }

}
