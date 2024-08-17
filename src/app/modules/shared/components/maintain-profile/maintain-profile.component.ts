import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { MaintainProfileService } from '../../services/maintain-profile.service';
import { Location } from '@angular/common';
import { HandleImagePickerService } from '../../services/handle-image-picker-service';

import { Profile } from '../../models/profile-model';

import { AuthValidations } from 'src/app/modules/feature/auth/validations/auth-validations';
import { MatchFieldValidator } from '../../validators/match-filed-validator';

@Component({
  selector: 'maintain-profile',
  templateUrl: './maintain-profile.component.html',
  styleUrls: ['./maintain-profile.component.scss'],
})
export class MaintainProfileComponent {
  profile!: Profile;

  isView = true;

  editBtnText: string = 'Edit';

  passwordShown = false;
  confirmPasswordShown = false;

  files: File[] = [];

  profileForm = new FormGroup(
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

  constructor(
    private _maintainProfile: MaintainProfileService,
    private _toastr: ToastrService,
    private _location: Location,
    private _handleImagePicker: HandleImagePickerService
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this._maintainProfile.getProfile().subscribe({
      next: (response) => {
        this.profile = response;

        this._maintainProfile.initProfileForm(this.profileForm, this.profile);
        if (response.imagePath) {
          this._handleImagePicker.loadImage(response.imagePath, this.files);
        }

        this.profileForm.disable();
      },
    });
  }

  selectImage(e: any) {
    this.files = [...e.addedFiles];
  }

  removeImage(e: any) {
    this.files = [];
  }

  createObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }

  goBack(): void {
    this._location.back();
  }

  editProfile(): void {
    if (this.isView) {
      this.isView = false;

      this.profileForm.enable();
      this.editBtnText = 'Save Changes';
    } else {
      this.submitEdit();
    }
  }

  submitEdit(): void {
    this.profileForm.markAllAsTouched();

    if (this.profileForm.valid && this.files.length === 1) {
      const profileFormData: FormData = new FormData();

      for (const [key, value] of Object.entries(this.profileForm.value)) {
        profileFormData.append(key, value as string);
      }

      profileFormData.append('profileImage', this.files[0]);

      this._maintainProfile.updateProfile(profileFormData).subscribe({
        next: () => {
          this._toastr.success('Profile is updated successfully');

          this.goBack();
        },
      });
    }
  }
}
