import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


export const authguard2Guard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const service = inject(AuthService);
  const token = service.getAccessToken();

  if (token) {
    const user = localStorage.getItem('user');
    if (user) {
      const use = JSON.parse(user);
      if (use.role == 'prof') {
        router.navigateByUrl('professeur')
      }else if(use.role == 'respo'){
        router.navigateByUrl('/responsable')
      }
    }
    return false;

  } else {
    return true;
  }

};
