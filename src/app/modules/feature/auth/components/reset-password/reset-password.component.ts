import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';

import { ResetPasswordRequest } from '../../models/reset-password-request-model';

import { AuthValidations } from '../../validations/auth-validations';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  passwordShown = false;

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    otp: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(AuthValidations.password.minLength),
      Validators.pattern(AuthValidations.password.pattern),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(AuthValidations.password.minLength),
      Validators.pattern(AuthValidations.password.pattern),
    ]),
  });

  constructor(private _auth: AuthService, private _toastr: ToastrService) {}

  togglePasswordVisibility(): void {
    this.passwordShown = !this.passwordShown;
  }

  submit(): void {
    this.resetPasswordForm.markAllAsTouched();

    if (this.resetPasswordForm.valid) {
      this._auth
        .resetPasswordUser(this.resetPasswordForm.value as ResetPasswordRequest)
        .subscribe({
          next: () => {},
          error: ({ error }) => {},
        });
    }
  }
}
