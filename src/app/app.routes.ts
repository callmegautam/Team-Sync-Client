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
    // add Home page component
  },
  {
    path: '',
    // add Auth layout component
    children: [
      {
        path: 'login',
        // add Login page component
      },
      {
        path: 'register',
        // add Register page component
      },
    ],
  },
  {
    path: 'dashboard',
    // add Dashboard layout component
    children: [
      {
        path: '',
        // add Dashboard page component
      },
      {
        path: 'tasks',
        // add Tasks page component
      },
      // and so on...
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
