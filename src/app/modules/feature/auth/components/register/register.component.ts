import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { VerifyCodeComponent } from '../verify-code/verify-code.component';

import { AuthService } from '../../services/auth.service';

import { AuthValidations } from '../../validations/auth-validations';
import { MatchFieldValidator } from 'src/app/modules/shared/validators/match-filed-validator';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  passwordShown = false;
  confirmPasswordShown = false;

  files: File[] = [];

  filesError = false;

  registerForm = new FormGroup(
    {
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(AuthValidations.userName.minLength),
        Validators.minLength(AuthValidations.userName.maxLength),
        Validators.pattern(AuthValidations.userName.pattern),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
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

  constructor(private _auth: AuthService, private dialog: MatDialog) {}

  selectImage(e: any) {
    this.files = [...e.addedFiles];

    this.filesError = this.files.length == 0;
  }

  removeImage(e: any) {
    this.files = [];

    this.filesError = this.files.length == 0;
  }

  createObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }

  openDialog(): void {
    this.dialog.open(VerifyCodeComponent, {
      data: { email: this.registerForm.value.email },
      minWidth: '35%',
    });
  }

  submit(): void {
    this.registerForm.markAllAsTouched();

    this.filesError = this.files.length == 0;

    if (this.registerForm.valid && this.files.length === 1) {
      const registerFormData: FormData = new FormData();

      for (const [key, value] of Object.entries(this.registerForm.value)) {
        registerFormData.append(key, value as string);
      }

      registerFormData.append('profileImage', this.files[0]);

      this._auth.registerUser(registerFormData).subscribe({
        next: () => {
          this.openDialog();
          this.registerForm.disable();
        },
      });
    }
  }
}
