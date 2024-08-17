import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss'],
})
export class DeleteItemComponent implements OnInit {
  id!: number;
  name: string = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string }
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.name = this.data.name;
  }

  delete(): void {
    this.dialogRef.close({ id: this.id });
  }
}
