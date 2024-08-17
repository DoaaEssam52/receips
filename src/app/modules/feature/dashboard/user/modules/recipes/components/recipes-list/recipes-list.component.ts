import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/modules/feature/dashboard/admin/modules/categories/services/categories.service';
import { LookUpsService } from 'src/app/services/look-ups-service';
import { RecipesService } from '../../services/recipes-service';
import { FavoritesService } from '../../../favorites/services/favorites-service';
import { ToastrService } from 'ngx-toastr';

import { Tag } from 'src/app/models/tag-model';
import { Category } from 'src/app/modules/shared/models/category-model';
import { ListHeader } from 'src/app/modules/shared/models/list-model';
import { Recipe } from 'src/app/modules/shared/models/recipe-model';

import { ViewRecipeComponent } from '../view-recipe/view-recipe.component';

@Component({
  selector: 'user-recipes-list',
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

  viewDialogRef: any;

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
    private _lookUps: LookUpsService,
    private _categories: CategoriesService,
    private _favorites: FavoritesService,
    private _toastr: ToastrService
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

  viewRecipe(recipe: Recipe): void {
    this.viewDialogRef = this.dialog.open(ViewRecipeComponent, {
      data: { recipe },
      minWidth: '55%',
    });

    this.viewDialogRef.afterClosed().subscribe((result: { id: number }) => {});
  }

  addFavoriteRecipe(e: any): void {
    this._favorites.addRecipeToFavorite(e.id).subscribe({
      next: () => {
        this._toastr.success('Added successfully to favorites');
      },
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
