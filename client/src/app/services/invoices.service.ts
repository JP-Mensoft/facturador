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

  public addInvoice(token: string, invoice: InvoiceModel): Observable<any> {
    return this._http.post(this.apiPath + "invoice/add", invoice, { 'headers': { token } });
  }

  public deleteInvoice(token: string, invoiceId: number): Observable<any> {
    return this._http.delete(this.apiPath + "invoice/delete/" + invoiceId, { 'headers': { token } });
  }

}
