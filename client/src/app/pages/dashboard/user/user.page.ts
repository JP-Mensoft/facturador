import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private _section: SectionService) { }

  ngOnInit() {
    this._section.setSectionName("Usuario");
  }

}
