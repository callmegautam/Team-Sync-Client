import { Routes } from '@angular/router';
import { HomeLayout } from './layout/home/home';
import { AuthGuard } from './guards/auth';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayout,
  },
  {
    path: '',
    loadComponent: () => import('./layout/auth/auth').then((m) => m.AuthLayout),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register').then((m) => m.Register),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/dashboard/dashboard').then((m) => m.DashboardLayout),

    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
        canActivate: [AuthGuard],
      },
      {
        path: 'tasks',
        loadComponent: () => import('./pages/tasks/tasks').then((m) => m.Tasks),
        canActivate: [AuthGuard],
      },
      {
        path: 'members',
        loadComponent: () => import('./pages/members/members').then((m) => m.Members),
        canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings').then((m) => m.Settings),
        canActivate: [AuthGuard],
      },
      {
        path: 'projects/:projectId',
        loadComponent: () => import('./pages/project/project').then((m) => m.Project),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
