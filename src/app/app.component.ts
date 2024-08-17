import { Component } from '@angular/core';

import { LookUpsService } from './services/look-ups-service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private _lookUps: LookUpsService,
  ) {}

  ngOnInit(): void {
    this._lookUps.getTagsDropDown();
  }
}
