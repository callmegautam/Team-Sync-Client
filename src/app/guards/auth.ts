import { AuthStore } from '@/store/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authStore: AuthStore,
    private router: Router,
  ) {}

  canActivate(): boolean {
    const isAuthenticated = this.authStore.isAuthenticated$;

    if (isAuthenticated) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
