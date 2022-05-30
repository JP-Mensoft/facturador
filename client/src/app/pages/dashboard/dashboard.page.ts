import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  public sectionName: string;
  private sectionNameSubscription: Subscription;

  constructor(private _section: DashboardService) {
    this.sectionName = "";
  }

  ngOnInit(): void {
    this.monitoringSectionName();
  }

  ngOnDestroy(): void {
    this.sectionNameSubscription.unsubscribe();
  }

  public setSectionName(sectionName: string): void {
    this.sectionName = sectionName;
  }

  public monitoringSectionName(): void {
    this.sectionNameSubscription = this._section.sectionName.subscribe({
      next: (name) => {
        this.sectionName = name;
      },
      error: () => { },
      complete: () => { }
    });
  }

}
