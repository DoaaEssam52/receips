import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';

import { RegisterRequest } from '../../models/register-request-model';

import { AuthValidations } from '../../validations/auth-validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  passwordShown = false;

  registerForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(AuthValidations.userName.minLength),
      Validators.pattern(AuthValidations.userName.pattern),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(AuthValidations.phoneNumber.pattern),
    ]),
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
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this._auth
        .registerUser(this.registerForm.value as RegisterRequest)
        .subscribe({
          next: () => {},
          error: ({ error }) => {},
        });
    }
  }
}
