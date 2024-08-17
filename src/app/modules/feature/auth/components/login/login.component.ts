import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

import { LoginRequest } from '../../models/login-request-model';

import { AuthValidations } from '../../validations/auth-validations';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  passwordShown = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(AuthValidations.password.minLength),
      Validators.pattern(AuthValidations.password.pattern),
    ]),
  });

  loginSubscription!: Subscription;

  constructor(
    private _auth: AuthService,
    private _toastr: ToastrService,
    private router: Router
  ) {}

  togglePasswordVisibility(): void {
    this.passwordShown = !this.passwordShown;
  }

  onSubmit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.loginSubscription = this._auth
        .login(this.loginForm.value as LoginRequest)
        .subscribe({
          next: ({ token }) => {
            this._toastr.success('Successfully logged in!!');

            localStorage.setItem('userToken', token);
            this._auth.getProfile();

            this.router.navigate(['/dashboard']);
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
