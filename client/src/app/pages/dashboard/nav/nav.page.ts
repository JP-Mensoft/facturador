import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.page.html',
  styleUrls: ['./nav.page.scss'],
})
export class NavPage implements OnInit {

  @Input() sectionName: string;

  constructor() {
    this.sectionName = "";
  }

  ngOnInit() {
  }

}
