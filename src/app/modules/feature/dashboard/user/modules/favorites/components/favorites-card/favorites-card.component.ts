import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { HandleImagePickerService } from 'src/app/modules/shared/services/handle-image-picker-service';
import { FavoritesService } from '../../services/favorites-service';
import { ToastrService } from 'ngx-toastr';

import { Recipe } from 'src/app/modules/shared/models/recipe-model';

@Component({
  selector: 'favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.scss'],
})
export class FavoritesCardComponent implements OnInit {
  @Input() recipe!: Recipe;
  @Input() favoriteReciptId!: number;

  @Output() deleteRecipeFromFavorites = new EventEmitter();

  files = [];

  constructor(
    public _handleImagePicker: HandleImagePickerService,
    private _favorites: FavoritesService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._handleImagePicker.loadImage(this.recipe.imagePath, this.files);
  }

  deleteRecipe(): void {
    this._favorites.deleteRecipeFromFavorite(this.favoriteReciptId).subscribe({
      next: () => {
        this._toastr.success('Successfully removed from favorites');

        this.deleteRecipeFromFavorites.emit();
      },
    });
  }
}
