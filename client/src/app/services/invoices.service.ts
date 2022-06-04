import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InvoiceModel } from '../models/invoiceModel';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  private apiPath: string;

  constructor(
    private _http: HttpClient
  ) {
    this.apiPath = environment.path;
  }

  public getOneInvoice(token: string, invoiceId: number): Observable<any> {
    return this._http.get(this.apiPath + "invoice/getone/" + invoiceId, { 'headers': { token } });
  }

  public getAllInvoices(token: string): Observable<any> {
    return this._http.get(this.apiPath + "invoice/getall", { 'headers': { token } });
  }

  public addInvoice(token: string, invoice: InvoiceModel): Observable<any> {
    return this._http.post(this.apiPath + "invoice/add", invoice, { 'headers': { token } });
  }

  public deleteInvoice(token: string, invoiceId: number): Observable<any> {
    return this._http.delete(this.apiPath + "invoice/delete/" + invoiceId, { 'headers': { token } });
  }

  public setCollectedInvoice(token: string, invoiceId: number): Observable<any> {
    return this._http.get(this.apiPath + "invoice/setcollected/" + invoiceId, { 'headers': { token } });
  }

}
