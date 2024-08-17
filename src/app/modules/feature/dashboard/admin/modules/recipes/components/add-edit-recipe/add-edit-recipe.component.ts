import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipesService } from '../../services/recipes-service';
import { CategoriesService } from '../../../categories/services/categories.service';
import { LookUpsService } from '../../../../../../../../services/look-ups-service';
import { HandleImagePickerService } from 'src/app/modules/shared/services/handle-image-picker-service';

import { Category } from '../../../../../../../shared/models/category-model';
import { Tag } from './../../../../../../../../models/tag-model';

import { environment } from '../../../../../../../../core/environments/environment';

@Component({
  selector: 'add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss'],
})
export class AddEditRecipeComponent {
  id: string = '';

  files: File[] = [];

  tagsDropDown: Tag[] = [];
  categoriesDropDown: Category[] = [];

  recipeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    tagId: new FormControl('', [Validators.required]),
    categoriesIds: new FormControl([]),
  });

  constructor(
    private _recipes: RecipesService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _categories: CategoriesService,
    private _lookUps: LookUpsService,
    private _handleImagePicker: HandleImagePickerService
  ) {
    this._route.params.subscribe({
      next: ({ id }) => {
        const isView = this._router.url.includes('view');

        this.id = id;

        if (this.id) {
          this.getRecipe();
        }

        if (isView) {
          this.recipeForm.disable();
        }
      },
    });
  }

  ngOnInit(): void {
    this.tagsDropDown = this._lookUps.tagsDropDown;
    this.getCategoriesDropDown();
  }

  getCategoriesDropDown(): void {
    this._categories.getCategoriesList(1, 1000).subscribe({
      next: ({ data }) => (this.categoriesDropDown = data),
    });
  }

  selectImage(e: any) {
    this.files = [...e.addedFiles];
  }

  removeImage(e: any) {
    this.files = [];
  }

  submit(): void {
    this.recipeForm.markAllAsTouched();

    if (this.recipeForm.valid && this.files.length === 1) {
      const recipeFormData: FormData = new FormData();

      for (const [key, value] of Object.entries(this.recipeForm.value)) {
        recipeFormData.append(key, value as string);
      }

      recipeFormData.append('recipeImage', this.files[0]);

      if (this.id) {
        this.editRecipe(recipeFormData);
      } else {
        this.addRecipe(recipeFormData);
      }
    }
  }

  getRecipe(): void {
    this._recipes.getRecipeById(this.id).subscribe({
      next: (response) => {
        this.recipeForm.patchValue({
          ...response,
          tagId: response.tag.id,
          categoriesIds: response.category.map((category: any) => category.id),
          recipeImage: environment.imageUrl + response.imagePath,
        });

        // Handle image
        if (response.imagePath) {
          this._handleImagePicker.loadImage(response.imagePath, this.files);
        }
      },
    });
  }

  addRecipe(recipe: FormData): void {
    this._recipes.addRecipe(recipe).subscribe({
      next: () => {
        this._router.navigateByUrl('/dashboard/admin/recipes');
      },
    });
  }

  editRecipe(recipe: FormData): void {
    this._recipes.updateRecipe(this.id, recipe).subscribe({
      next: () => {
        this._router.navigateByUrl('/dashboard/admin/recipes/list');
      },
    });
  }
}
