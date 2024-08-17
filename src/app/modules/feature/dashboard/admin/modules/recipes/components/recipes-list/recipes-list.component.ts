import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';

import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { RecipesService } from '../../services/recipes-service';
import { LookUpsService } from '../../../../../../../../services/look-ups-service';
import { CategoriesService } from '../../../categories/services/categories.service';

import { Recipe } from '../../../../../../../shared/models/recipe-model';
import { Tag } from '../../../../../../../../models/tag-model';
import { Category } from '../../../../../../../shared/models/category-model';
import { ListHeader } from '../../../../../../../../modules/shared/models/list-model';

import { DeleteItemComponent } from '../../../../../../../../modules/shared/components/delete-item/delete-item.component';

@Component({
  selector: 'admin-recipes-list',
  templateUrl: './recipes-list.component.html',
})
export class RecipesListComponent {
  recipesList!: Recipe[];

  tagsDropDown: Tag[] = [];
  categoriesDropDown: Category[] = [];

  headers: ListHeader[];

  length: number = 0;
  pageSize = 10;
  pageNumber = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  addEditDialogRef: any;
  deleteDialogRef: any;

  pageEvent!: PageEvent;

  recipesSubscription!: Subscription;

  filterForm = new FormGroup({
    name: new FormControl(''),
    tagId: new FormControl(''),
    categoriesIds: new FormControl([]),
  });

  constructor(
    private _recipes: RecipesService,
    public dialog: MatDialog,
    private _router: Router,
    private _lookUps: LookUpsService,
    private _categories: CategoriesService
  ) {
    this.headers = this._recipes.listHeaders;
  }

  ngOnInit(): void {
    this.tagsDropDown = this._lookUps.tagsDropDown;
    this.getCategoriesDropDown();

    this.getRecipesList();
  }

  getCategoriesDropDown(): void {
    this._categories.getCategoriesList(1, 1000).subscribe({
      next: ({ data }) => (this.categoriesDropDown = data),
    });
  }

  getRecipesList(): void {
    this.recipesSubscription = this._recipes
      .getRecipesList(
        this.pageNumber + 1,
        this.pageSize,
        this.filterForm.value as any
      )
      .subscribe({
        next: ({ data, totalNumberOfRecords }) => {
          this.recipesList = this._recipes.handleRecipesListResponse(data);
          this.length = totalNumberOfRecords;
        },
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;

    this.getRecipesList();
  }

  openDeleteRecipe(id: number): void {
    this.deleteDialogRef = this.dialog.open(DeleteItemComponent, {
      data: { id, name: 'Recipe' },
    });

    this.deleteDialogRef.afterClosed().subscribe((result: { id: number }) => {
      this.deleteRecipe(result.id);
    });
  }

  viewRecipe(id: any): void {
    this._router.navigateByUrl('/dashboard/admin/recipes/view/recipe/' + id);
  }

  addRecipe(): void {
    this._router.navigateByUrl('/dashboard/admin/recipes/recipe');
  }

  editRecipe(id: number): void {
    this._router.navigateByUrl('/dashboard/admin/recipes/recipe/' + id);
  }

  deleteRecipe(id: number): void {
    this._recipes.deleteRecipe(id).subscribe({
      next: () => this.getRecipesList(),
    });
  }

  filter(): void {
    this.pageNumber = 0;

    this.getRecipesList();
  }

  resetFilter(): void {
    this.pageNumber = 0;
    this.filterForm.reset();

    this.getRecipesList();
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
