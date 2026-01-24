import { UserStore } from '@/stores/user.store';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof window === 'undefined') {
    return true;
  }
  const userStore = inject(UserStore);
  const router = inject(Router);
  const user = userStore.user();

  if (!user.id) {
    router.navigate(['./login']);
    return false;
  }
  return true;
};
