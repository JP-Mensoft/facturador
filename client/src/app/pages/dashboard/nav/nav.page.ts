import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.page.html',
  styleUrls: ['./nav.page.scss'],
})
export class NavPage implements OnInit {

  @Input() sectionName: string;
  @Input() loggedUser: string;

  constructor(private _storage: StorageService, private _router: Router) {
    this.sectionName = "";
    this.loggedUser = "";
  }

  ngOnInit() { }

  public logout(): void {
    this._storage.remove("token").then(() => {
      this._storage.remove("email").then(() => {
        this._router.navigate(["auth/login"]);
      });
    });
  }

}
