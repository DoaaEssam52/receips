import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ListHeader } from './../../../../../../../modules/shared/models/list-model';

import { environment } from '../../../../../../../core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private _httpClient: HttpClient) {}

  // HTTP Requests
  getFavoriteRecipes(pageNumber: number, pageSize: number): Observable<any> {
    let queryParams = new HttpParams();

    queryParams = queryParams.append('pageNumber', pageNumber);
    queryParams = queryParams.append('pageSize', pageSize);

    return this._httpClient.get(environment.getFavoriteRecipes, {
      params: queryParams,
    });
  }

  addRecipeToFavorite(id: number): Observable<any> {
    return this._httpClient.post(environment.addFavoriteRecipe, {
      recipeId: id,
    });
  }

  deleteRecipeFromFavorite(id: number): Observable<any> {
    return this._httpClient.delete(environment.deleteFavoriteRecipe + id);
  }
}
