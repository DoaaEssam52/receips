import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GetRecipesList } from '../../../../../../shared/models/get-recipes-list-model';
import { ListHeader } from './../../../../../../../modules/shared/models/list-model';

import { environment } from '../../../../../../../core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private _httpClient: HttpClient) {}

  // HTTP Requests
  getRecipesList(
    pageNumber: number,
    pageSize: number,
    filteration: any
  ): Observable<GetRecipesList> {
    let queryParams = new HttpParams();

    queryParams = queryParams.append('pageNumber', pageNumber);
    queryParams = queryParams.append('pageSize', pageSize);

    for (const [key, value] of Object.entries(filteration)) {
      if (value) {
        queryParams = queryParams.append(key, value as any);
      }
    }

    return this._httpClient.get<GetRecipesList>(environment.getRecipesList, {
      params: queryParams,
    });
  }

  getRecipeById(id: any): Observable<any> {
    return this._httpClient.get(environment.getRecipe + id);
  }

  addRecipe(recipe: FormData): Observable<any> {
    return this._httpClient.post(environment.createRecipe, recipe);
  }

  updateRecipe(id: any, recipe: FormData): Observable<any> {
    return this._httpClient.put(environment.updateRecipe + '/' + id, recipe);
  }

  deleteRecipe(id: number): Observable<any> {
    return this._httpClient.delete(environment.deleteRecipe + '/' + id);
  }

  // Handle Data
  get listHeaders(): ListHeader[] {
    return [
      {
        type: 'text',
        header: 'Name',
        datafiled: 'name',
      },
      {
        type: 'image',
        header: 'Image',
        datafiled: 'imagePath',
      },
      {
        type: 'text',
        header: 'Price',
        datafiled: 'price',
      },
      {
        type: 'text',
        header: 'Description',
        datafiled: 'description',
      },
      {
        type: 'text',
        header: 'Tag',
        datafiled: 'tag',
      },
      {
        type: 'text',
        header: 'Category',
        datafiled: 'category',
      },
      {
        type: 'actions',
        header: 'Actions',
        datafiled: 'actions',
        actions: {
          isView: true,
          isEdit: true,
          isDelete: true,
        },
      },
    ];
  }

  handleRecipesListResponse(list: any[]): any[] {
    return list.map((item) => {
      return {
        ...item,
        tag: item.tag.name,
        category: item.category.map(({ name }: any) => name),
      };
    });
  }
}
