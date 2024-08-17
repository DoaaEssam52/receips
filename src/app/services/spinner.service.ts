import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  showSpinner = new BehaviorSubject(false);

  show(): void {
    this.showSpinner.next(true);
  }

  hide(): void {
    this.showSpinner.next(false);
  }
}
