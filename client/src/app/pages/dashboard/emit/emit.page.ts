import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-emit',
  templateUrl: './emit.page.html',
  styleUrls: ['./emit.page.scss'],
})
export class EmitPage implements OnInit {

  constructor(private _dashboard: DashboardService) { }

  ngOnInit() {
    this._dashboard.setSectionName("Emitir");
  }

}
