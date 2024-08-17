import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { MatchFieldValidator } from './../../../../../modules/shared/validators/match-filed-validator';

import { ResetPasswordRequest } from '../../models/reset-password-request-model';

import { AuthValidations } from '../../validations/auth-validations';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  passwordShown = false;
  confirmPasswordShown = false;

  resetPasswordForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      seed: new FormControl('', Validators.required),
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
    },
    [MatchFieldValidator('password', 'confirmPassword')]
  );

  constructor(private _auth: AuthService, private router: Router) {}

  submit(): void {
    this.resetPasswordForm.markAllAsTouched();

    if (this.resetPasswordForm.valid) {
      this._auth
        .resetPasswordUser(this.resetPasswordForm.value as ResetPasswordRequest)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/auth/login');
          },
        });
    }
  }
}
