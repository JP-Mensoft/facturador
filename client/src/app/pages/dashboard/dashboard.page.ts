import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public sectionName: string;

  constructor(private _section: SectionService) {
    this.sectionName = "";
  }

  ngOnInit() {
    this.monitoringSectionName();
  }

  public setSectionName(sectionName: string): void {
    this.sectionName = sectionName;
  }

  public monitoringSectionName(): void {
    this._section.sectionName.subscribe({
      next: (name) => {
        this.sectionName = name;
      },
      error: () => { },
      complete: () => { }
    });
  }

}
