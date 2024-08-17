import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { ForgetPasswordRequest } from '../../models/forget-password-request-model';

@Component({
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  forgetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private _auth: AuthService, private router: Router) {}

  submit(): void {
    this.forgetPasswordForm.markAllAsTouched();

    if (this.forgetPasswordForm.valid) {
      this._auth
        .forgetPasswordUser(
          this.forgetPasswordForm.value as ForgetPasswordRequest
        )
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/auth/reset-password');
          },
        });
    }
  }
}
