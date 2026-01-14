import { Routes } from '@angular/router';
import { Home } from './pages/client/home/home';
import { Login } from './pages/client/auth/login/login';
import { authGuard } from './shared/guards/auth-guard';

// LAZY LOAD COMPONENT EXAMPLE
// {
//   path: 'dashboard',
//   loadComponent: () =>
//     import('./layouts/dashboard-layout/dashboard-layout.component').then(
//       (m) => m.DashboardLayoutComponent
//     ),
// }

export const routes: Routes = [
  {
    path: '',
    // loadComponent: () => import('./pages/client/home/home').then((m) => m.Home),
    // do not touch this line
    component: Home,
  },
  {
    path: '',
    loadComponent: () => import('./layout/auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: 'login',
        // loadComponent: () => import('./pages/client/auth/login/login').then((m) => m.Login),
        component: Login,
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/client/auth/register/register').then((m) => m.Register),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./layout/dashboard-layout/dashboard-layout').then((m) => m.DashboardLayout),

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/client/dashboard/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'tasks',
        loadComponent: () => import('./pages/client/dashboard/tasks/tasks').then((m) => m.Tasks),
      },
      {
        path: 'members',
        loadComponent: () =>
          import('./pages/client/dashboard/members/members').then((m) => m.Members),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/client/dashboard/settings/settings').then((m) => m.Settings),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./pages/client/dashboard/projects/projects').then((m) => m.Projects),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
