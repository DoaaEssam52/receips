import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoginRequest } from '../models/login-request-model';
import { LoginResponse } from '../models/login-response-model';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  // HTTP Requests
  login(form: LoginRequest): Observable<LoginResponse> {
    return this._httpClient.post<LoginResponse>(
      `${environment.userBaseUrl}/${environment.userLogin}`,
      form
    );
  }
}
