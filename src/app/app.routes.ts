import { Routes } from '@angular/router';

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
    loadComponent: () => import('./pages/client/home/home').then((m) => m.Home),
    // add Home page component
  },
  {
    path: 'auth',
    loadComponent: () => import('./core/layout/auth-layout/auth-layout').then((m) => m.AuthLayout),
    // add Auth layout component
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/client/auth/login/login').then((m) => m.Login),
        // add Login page component
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/client/auth/register/register').then((m) => m.Register),
        // add Register page component
      },
    ],
  },
  // {
  //   path: 'dashboard',
  //   // add Dashboard layout component
  //   children: [
  //     {
  //       path: '',
  //       // add Dashboard page component
  //     },
  //     {
  //       path: 'tasks',
  //       // add Tasks page component
  //     },
  //     // and so on...
  //   ],
  // },
  {
    path: '**',
    redirectTo: '',
  },
];
