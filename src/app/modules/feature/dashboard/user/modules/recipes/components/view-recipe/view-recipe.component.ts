import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HandleImagePickerService } from 'src/app/modules/shared/services/handle-image-picker-service';
import { FavoritesService } from '../../../favorites/services/favorites-service';
import { ToastrService } from 'ngx-toastr';

import { Recipe } from 'src/app/modules/shared/models/recipe-model';

@Component({
  selector: 'view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss'],
})
export class ViewRecipeComponent {
  files = [];

  constructor(
    public _handleImagePicker: HandleImagePickerService,
    public dialogRef: MatDialogRef<ViewRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recipe: Recipe },
    private _favorite: FavoritesService,
    private _toastr: ToastrService
  ) {}

  addToFavorite(): void {
    this._favorite.addRecipeToFavorite(this.data.recipe.id).subscribe({
      next: () => {
        this.dialogRef.close();

        this._toastr.success('Successfully added to favorites');
      },
    });
  }
}
