import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { MaintainProfileComponent } from './modules/shared/components/maintain-profile/maintain-profile.component';

import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/feature/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/feature/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [authGuard],
  },
  { path: 'profile', component: MaintainProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
