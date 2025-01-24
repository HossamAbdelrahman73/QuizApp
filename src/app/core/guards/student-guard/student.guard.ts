import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const studentGuard: CanActivateFn = (route, state) => {
  const _Route = inject(Router);

  if(localStorage.getItem('token')!== null && localStorage.getItem('role')=='Student'){
    return true;
  }else{
    _Route.navigate(['/auth']);
    return false
  }
};
