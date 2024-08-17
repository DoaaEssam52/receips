import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HandleImagePickerService } from 'src/app/modules/shared/services/handle-image-picker-service';

import { User } from '../../models/user-model';

@Component({
  selector: 'view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent {
  id: string = '';

  user!: User;

  files: File[] = [];

  constructor(
    public _handleImagePicker: HandleImagePickerService,
    public dialogRef: MatDialogRef<ViewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {}

  ngOnInit(): void {
    this.user = this.data.user;

    this._handleImagePicker.loadImage(this.data.user.imagePath, this.files);
  }
}
