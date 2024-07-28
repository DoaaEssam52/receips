import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ErrorMessagesPipe } from './pipes/error-messages.pipe';

import { SharedComponent } from './shared.component';

@NgModule({
  declarations: [SharedComponent, ErrorMessagesPipe],
  imports: [CommonModule, SharedRoutingModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, ErrorMessagesPipe],
})
export class SharedModule {}
