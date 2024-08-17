import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GetCategoriesListResponse } from '../../../../../../shared/models/get-categories-list-response-model';
import { AddCategoryResponse } from '../models/add-category-response-model';
import { ListHeader } from 'src/app/modules/shared/models/list-model';

import { environment } from '../../../../../../../core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private _httpClient: HttpClient) {}

  // HTTP Requests
  getCategoriesList(
    pageNumber: number,
    pageSize: number
  ): Observable<GetCategoriesListResponse> {
    let queryParams = new HttpParams();

    queryParams = queryParams.append('pageNumber', pageNumber);
    queryParams = queryParams.append('pageSize', pageSize);

    return this._httpClient.get<GetCategoriesListResponse>(
      environment.getCategoriesList,
      { params: queryParams }
    );
  }

  addCategory(name: string): Observable<AddCategoryResponse> {
    return this._httpClient.post<AddCategoryResponse>(
      environment.createCategory,
      { name }
    );
  }

  updateCategory(id: number, name: string): Observable<any> {
    return this._httpClient.put(environment.createCategory + '/' + id, {
      name,
    });
  }

  deleteCategory(id: number): Observable<any> {
    return this._httpClient.delete(environment.createCategory + '/' + id);
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
        type: 'date',
        header: 'Creation Date',
        datafiled: 'creationDate',
        format: 'dd/mm/yyyy',
      },
      {
        type: 'date',
        header: 'Modification Date',
        datafiled: 'modificationDate',
        format: 'dd/mm/yyyy',
      },
      {
        type: 'actions',
        header: 'Actions',
        datafiled: 'actions',
        actions: {
          isView: false,
          isEdit: true,
          isDelete: true,
        },
      },
    ];
  }
}
