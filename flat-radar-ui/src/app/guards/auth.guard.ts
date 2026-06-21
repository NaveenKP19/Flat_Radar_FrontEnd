import { CanActivateFn, Router } from '@angular/router';
import { Inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
const token = localStorage.getItem('token');

  const router = Inject(Router);

  if(token){return true;}
  router.navigate(['/']);
  return false;
};
