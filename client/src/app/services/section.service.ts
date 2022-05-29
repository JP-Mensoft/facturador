import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  public sectionName: Subject<string>;

  constructor() {
    this.sectionName = new Subject<string>();
  }

  public setSectionName(sectionName: string): void {
    this.sectionName.next(sectionName);
  }

}
