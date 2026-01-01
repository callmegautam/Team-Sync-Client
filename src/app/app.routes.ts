import { Routes } from '@angular/router';
import { AuthLayout } from './core/layout/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/client/home/home').then((m) => m.Home),
  },
  {
    path: 'login',
    loadComponent: () => import('./core/layout/auth-layout/auth-layout').then((m) => m.AuthLayout),
  },
];
