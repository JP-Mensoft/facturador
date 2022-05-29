import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-emit',
  templateUrl: './emit.page.html',
  styleUrls: ['./emit.page.scss'],
})
export class EmitPage implements OnInit {

  constructor(private _section: SectionService) { }

  ngOnInit() {
    this._section.setSectionName("Emitir");
  }

}
