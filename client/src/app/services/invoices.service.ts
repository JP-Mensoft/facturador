import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

}
