import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let isAuth: boolean = false;
  //true deja pasar, false no deja pasar
  if(localStorage.getItem('accessToken')){
    isAuth = true;
  } else{
    router.navigate(['/login']);
  }
  return isAuth;
};
