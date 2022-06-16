import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public class: boolean = true;
  public event: string = '';

  constructor() { }

  ngOnInit(): void { }

  sidebar(event: any) {
    this.event = event;
    this.class = !this.class;
  }

  onActivate(event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
