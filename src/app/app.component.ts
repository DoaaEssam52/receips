import { Component } from '@angular/core';

import { LookUpsService } from './services/look-ups-service';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private _lookUps: LookUpsService,
    private _spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    this._lookUps.getTagsDropDown();
  }
}
