import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate, CanActivateChild {

  constructor(
    private _storage: StorageService,
    private _auth: AuthService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async (resolve) => {
      this._auth.checkToken(this._storage.get("token")).subscribe({
        next: (result: ResponseModel) => {
          if (result.success) {
            resolve(true);
          }
        },
        error: () => {
          this._router.navigate(['auth/login']);
          resolve(false);
        },
        complete: () => { }
      });
    });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise(async (resolve) => {
      this._auth.checkToken(this._storage.get("token")).subscribe({
        next: (result: ResponseModel) => {
          if (result.success) {
            resolve(true);
          }
        },
        error: () => {
          this._router.navigate(['auth/login']);
          resolve(false);
        },
        complete: () => { }
      });
    });
  }

}
