import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../core/environments/environment';
import { Tag } from '../models/tag-model';

@Injectable({
  providedIn: 'root',
})
export class LookUpsService {
  tagsDropDown: Tag[] = [];

  constructor(private _httpClient: HttpClient) {}

  // HTTP Requests
  getTagsDropDown(): void {
    this._httpClient.get<Tag[]>(`${environment.getTagsList}`).subscribe({
      next: (tags: Tag[]) => {
        this.tagsDropDown = tags;
      },
    });
  }
}
