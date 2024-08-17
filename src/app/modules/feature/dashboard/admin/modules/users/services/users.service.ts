import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GetUsersList } from '../models/get-users-list-model';
import { ListHeader } from './../../../../../../../modules/shared/models/list-model';

import { environment } from '../../../../../../../core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _httpClient: HttpClient) {}

  // HTTP Requests
  getUsersList(
    pageNumber: number,
    pageSize: number,
    searchKey: string,
    searchValue: string
  ): Observable<GetUsersList> {
    let queryParams = new HttpParams();

    queryParams = queryParams.append('pageNumber', pageNumber);
    queryParams = queryParams.append('pageSize', pageSize);

    if (searchKey && searchValue) {
      queryParams = queryParams.append(searchKey, searchValue);
    }

    return this._httpClient.get<GetUsersList>(environment.getUsersList, {
      params: queryParams,
    });
  }

  getUserById(id: any): Observable<any> {
    return this._httpClient.get(environment.getUser + id);
  }

  deleteUser(id: number): Observable<any> {
    return this._httpClient.delete(environment.deleteUser + '/' + id);
  }

  // Handle Data
  get listHeaders(): ListHeader[] {
    return [
      {
        type: 'text',
        header: 'Name',
        datafiled: 'userName',
      },
      {
        type: 'image',
        header: 'Image',
        datafiled: 'imagePath',
        defaultImage: 'user.svg',
      },
      {
        type: 'text',
        header: 'Email',
        datafiled: 'email',
      },
      {
        type: 'text',
        header: 'Phone',
        datafiled: 'phoneNumber',
      },
      {
        type: 'text',
        header: 'Role',
        datafiled: 'role',
      },
      {
        type: 'actions',
        header: 'Actions',
        datafiled: 'actions',
        actions: {
          isView: true,
          isEdit: false,
          isDelete: true,
        },
      },
    ];
  }

  handleUsersListResponse(list: any[]): any[] {
    return list.map((item) => {
      return { ...item, role: item.group.name };
    });
  }
}
