import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';

import { AuthService } from 'src/app/modules/feature/auth/services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const _auth = inject(AuthService);

  if (localStorage.getItem('userToken') && _auth.role === 'SuperAdmin') {
    return true;
  } else {
    router.navigate(['/dashboard']);

    return false;
  }
};
