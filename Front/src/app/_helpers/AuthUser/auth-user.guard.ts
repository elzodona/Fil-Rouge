import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


export const authUserGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const service = inject(AuthService);
  const user = localStorage.getItem('user');

  if (user) {
    const use = JSON.parse(user)
    if (use.role == 'prof') {
      return true;
    }
    return false;
  } else {
    return false
  }

};
