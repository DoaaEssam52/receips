import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Category } from '../../../../../../../../modules/shared/models/category-model';

@Component({
  selector: 'add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss'],
})
export class AddEditCategoryComponent {
  type: string = 'Add';
  id!: number;
  name: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string; category: Category }
  ) {}

  ngOnInit(): void {
    this.type = this.data.type;

    if (this.type !== 'Add') {
      this.id = this.data.category.id;
      this.name = this.data.category.name;
    }
  }

  save(): void {
    this.dialogRef.close({ name: this.name, id: this.id });
  }
}
