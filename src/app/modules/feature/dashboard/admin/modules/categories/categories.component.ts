import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from './services/categories.service';

import { ListHeader } from './../../../../../../modules/shared/models/list-model';
import { Category } from './../../../../../../modules/shared/models/category-model';

import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { DeleteItemComponent } from 'src/app/modules/shared/components/delete-item/delete-item.component';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categoriesList!: Category[];

  length: number = 0;
  pageSize = 10;
  pageNumber = 0;

  addEditDialogRef: any;
  deleteDialogRef: any;

  pageEvent!: PageEvent;

  headers: ListHeader[] = [];

  categoriesSubscription!: Subscription;

  constructor(
    private _categories: CategoriesService,
    public dialog: MatDialog
  ) {
    this.headers = this._categories.listHeaders;
  }

  ngOnInit(): void {
    this.getCategoriesList();
  }

  getCategoriesList(): void {
    this.categoriesSubscription = this._categories
      .getCategoriesList(this.pageNumber + 1, this.pageSize)
      .subscribe({
        next: ({ data, totalNumberOfRecords }) => {
          this.categoriesList = data;
          this.length = totalNumberOfRecords;
        },
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;

    this.getCategoriesList();
  }

  openAddEditCategory(type: string, category?: Category): void {
    this.addEditDialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: { type, category },
      minWidth: '50%',
    });

    this.addEditDialogRef
      .afterClosed()
      .subscribe((result: { name: string; id: any }) => {
        if (type === 'Add') {
          this.addCategory(result.name);
        } else if (type === 'Edit') {
          this.editCategory(result.id, result.name);
        }
      });
  }

  openDeleteCategory(id: number): void {
    this.deleteDialogRef = this.dialog.open(DeleteItemComponent, {
      data: { id, name: 'Category' },
    });

    this.deleteDialogRef.afterClosed().subscribe((result: { id: number }) => {
      this.deleteCategory(result.id);
    });
  }

  addCategory(name: string): void {
    this._categories.addCategory(name).subscribe({
      next: () => this.getCategoriesList(),
    });
  }

  editCategory(id: number, name: string): void {
    this._categories.updateCategory(id, name).subscribe({
      next: () => this.getCategoriesList(),
    });
  }

  deleteCategory(id: number): void {
    this._categories.deleteCategory(id).subscribe({
      next: () => this.getCategoriesList(),
    });
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }
}
