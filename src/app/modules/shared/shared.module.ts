import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ErrorMessagesPipe } from './pipes/error-messages.pipe';

import { SharedComponent } from './shared.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

@NgModule({
  declarations: [
    SharedComponent,
    ErrorMessagesPipe,
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    ReactiveFormsModule,
    ErrorMessagesPipe,
    NavbarComponent,
    SidebarComponent,
  ],
})
export class SharedModule {}
