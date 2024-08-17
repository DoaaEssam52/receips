import { Component } from '@angular/core';

import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  constructor(public _spinner: SpinnerService) {}
}
