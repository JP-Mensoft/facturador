import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public sectionName: string;

  constructor() {
    this.sectionName = "";
  }

  ngOnInit() {
  }

  public setSectionName(sectionName: string): void {
    this.sectionName = sectionName;
  }

}
