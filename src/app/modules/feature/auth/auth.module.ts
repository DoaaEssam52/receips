import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, ForgetPasswordComponent, ResetPasswordComponent, RegisterComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, HttpClientModule],
})
export class AuthModule {}
