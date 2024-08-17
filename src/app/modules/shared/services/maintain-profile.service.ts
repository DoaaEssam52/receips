import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FormGroup } from '@angular/forms';

import { Profile } from '../models/profile-model';

import { environment } from '../../../core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaintainProfileService {
  constructor(private _httpClient: HttpClient) {}

  // HTTP Requests
  getProfile(): Observable<Profile> {
    return this._httpClient.get<Profile>(environment.getMyProfile);
  }

  updateProfile(form: FormData): Observable<Profile> {
    return this._httpClient.put<Profile>(environment.updateMyProfile, form);
  }

  // Handle Form
  initProfileForm(form: FormGroup, profile: Profile): void {
    const { userName, email, country, phoneNumber } = profile;

    form.patchValue({
      userName,
      email,
      country,
      phoneNumber,
    });
  }

  // id: number;
  // userName: string;
  // email: string;
  // country: string;
  // phoneNumber: string;
  // imagePath: string;
  // group: {
  //   id: number;
  //   name: string;
  //   creationDate: string;
  //   modificationDate: string;
  // };
  // creationDate: string;
  // modificationDate: string;
}
