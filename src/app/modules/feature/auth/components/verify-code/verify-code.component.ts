import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from '../../services/auth.service';

import { VerifyCodeRequest } from '../../models/verify-code-request-model';

import { AuthValidations } from '../../validations/auth-validations';

@Component({
  selector: 'verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent implements OnInit {
  verifyForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl('', [
      Validators.required,
      Validators.pattern(AuthValidations.verifyCode.pattern),
    ]),
  });

  constructor(
    private _auth: AuthService,
    public dialogRef: MatDialogRef<VerifyCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verifyForm.patchValue({ email: this.data.email });
  }

  submit(): void {
    this._auth
      .verifyCode(this.verifyForm.value as VerifyCodeRequest)
      .subscribe({
        next: () => {
          this.dialogRef.close();
          this.router.navigateByUrl('/auth/login');
        },
      });
  }
}
