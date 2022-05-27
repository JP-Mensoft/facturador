import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private _storage: StorageService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  public logout(): void {
    this._storage.remove("token").then(() => {
      this._router.navigate(['auth/login'])
    });
  }

}
