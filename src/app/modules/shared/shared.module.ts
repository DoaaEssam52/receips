import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { ErrorMessagesPipe } from './pipes/error-messages.pipe';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EmptyListComponent } from './components/empty-list/empty-list.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaintainProfileComponent } from './components/maintain-profile/maintain-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [
    ErrorMessagesPipe,
    NavbarComponent,
    SidebarComponent,
    EmptyListComponent,
    DeleteItemComponent,
    SpinnerComponent,
    MaintainProfileComponent,
    ChangePasswordComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDividerModule,
    NgxDropzoneModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
    MatDividerModule,
    NgxDropzoneModule,
    NgxDropzoneModule,
    ErrorMessagesPipe,
    NavbarComponent,
    SidebarComponent,
    EmptyListComponent,
    SpinnerComponent,
    ChangePasswordComponent,
    ListComponent,
  ],
})
export class SharedModule {}
