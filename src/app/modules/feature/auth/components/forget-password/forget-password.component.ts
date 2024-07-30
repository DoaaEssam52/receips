import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';

import { ForgetPasswordRequest } from '../../models/forget-password-request-model';

import { AuthValidations } from '../../validations/auth-validations';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  forgetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(AuthValidations.password.minLength),
      Validators.pattern(AuthValidations.password.pattern),
    ]),
  });

  constructor(private _auth: AuthService, private _toastr: ToastrService) {}

  submit(): void {
    this.forgetPasswordForm.markAllAsTouched();

    if (this.forgetPasswordForm.valid) {
      this._auth
        .forgetPasswordUser(
          this.forgetPasswordForm.value as ForgetPasswordRequest
        )
        .subscribe({
          next: () => {},
          error: ({ error }) => {},
        });
    }
  }
}
