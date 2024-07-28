import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import { AuthValidations } from '../../validations/auth-validations';
import { LoginRequest } from '../../models/login-request-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  passwordShown = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(AuthValidations.password.minLength),
      Validators.pattern(AuthValidations.password.pattern),
    ]),
  });

  constructor(private _auth: AuthService) {}

  togglePasswordVisibility(): void {
    this.passwordShown = !this.passwordShown;
  }

  submitLogin(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this._auth.login(this.loginForm.value as LoginRequest).subscribe({
        next: (response) => console.log(response),
      });
    }
  }
}
