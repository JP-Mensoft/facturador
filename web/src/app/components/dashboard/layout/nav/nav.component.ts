import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter();
  @Input() class: Boolean = true;

  public esLogout: boolean;

  constructor(
    private _storage: StorageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.esLogout = false;
  }

  sidebar(status: boolean) {
    if (status) {
      this.newItemEvent.emit('');
    } else {
      this.newItemEvent.emit('sb-sidenav-toggled');
    }
    this.class = !this.class;
  }

  logout() {
    this.esLogout = true;
    setTimeout(() => {
      this._storage.clear();
      this._router.navigate(["auth"]);
    }, 600);
  }

  public goUser(): void {
    this._router.navigate(["user"]);
  }

}
