import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/feature/auth/services/auth.service';

import { MatchFieldValidator } from 'src/app/modules/shared/validators/match-filed-validator';

import { AuthValidations } from 'src/app/modules/feature/auth/validations/auth-validations';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  oldPasswordShown = false;
  newPasswordShown = false;
  confirmPasswordShown = false;

  changePasswordForm = new FormGroup(
    {
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(AuthValidations.password.minLength),
        Validators.pattern(AuthValidations.password.pattern),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(AuthValidations.password.minLength),
        Validators.pattern(AuthValidations.password.pattern),
      ]),
      confirmNewPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(AuthValidations.password.minLength),
        Validators.pattern(AuthValidations.password.pattern),
      ]),
    },
    [MatchFieldValidator('newPassword', 'confirmNewPassword')]
  );

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private _auth: AuthService,
    private _toastr: ToastrService
  ) {}

  submit(): void {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.valid) {
      this._auth.changePassword(this.changePasswordForm.value).subscribe({
        next: () => {
          this.dialogRef.close();

          this._toastr.success('Your password is updated successfully');
        },
      });
    }
  }
}
