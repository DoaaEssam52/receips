import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

import { LoginRequest } from '../models/login-request-model';
import { RegisterRequest } from '../models/register-request-model';
import { ResetPasswordRequest } from '../models/reset-password-request-model';
import { ForgetPasswordRequest } from '../models/forget-password-request-model';
import { LoginResponse } from '../models/login-response-model';

import { environment } from '../../../../core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  role!: string | null;

  constructor(private _httpClient: HttpClient) {
    this.getProfile();
  }

  // Common Methods
  getProfile(): void {
    const encodeToken: any = localStorage.getItem('userToken');

    if (encodeToken) {
      const decodeToken: any = jwtDecode(encodeToken);

      localStorage.setItem('userName', decodeToken.userName);
      localStorage.setItem('userEmail', decodeToken.userEmail);
      localStorage.setItem('userRole', decodeToken.userGroup);
    }

    this.getRole();
  }

  getRole(): void {
    if (localStorage.getItem('userRole')) {
      this.role = localStorage.getItem('userRole');
    }
  }

  isUser(): boolean {
    return this.role === 'SystemUser';
  }

  isAdmin(): boolean {
    return this.role === 'SuperAdmin';
  }

  // HTTP Requests
  login(form: LoginRequest): Observable<LoginResponse> {
    return this._httpClient.post<LoginResponse>(
      `${environment.userBaseUrl}/${environment.userLogin}`,
      form
    );
  }

  registerUser(form: RegisterRequest): Observable<any> {
    return this._httpClient.post<any>(
      `${environment.userBaseUrl}/${environment.userRegister}`,
      form
    );
  }

  forgetPasswordUser(form: ForgetPasswordRequest): Observable<any> {
    return this._httpClient.post<any>(
      `${environment.userBaseUrl}/${environment.userForgetPassword}`,
      form
    );
  }

  resetPasswordUser(form: ResetPasswordRequest): Observable<any> {
    return this._httpClient.post<any>(
      `${environment.userBaseUrl}/${environment.userResetPassword}`,
      form
    );
  }
}
