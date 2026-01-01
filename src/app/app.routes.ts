
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { TasksComponent } from './pages/tasks/tasks';
import { ProjectsComponent } from './pages/projects/projects';
import { MembersComponent } from './pages/members/members';
import { WorkspaceComponent } from './pages/workspace/workspace';
import { NotificationComponent } from './pages/notification/notification';
import { SettingsComponent } from './pages/settings/settings';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: MainLayoutComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'tasks', component: TasksComponent },
            { path: 'projects', component: ProjectsComponent },
            { path: 'members', component: MembersComponent },
            { path: 'workspace', component: WorkspaceComponent },
            { path: 'notification', component: NotificationComponent },
            { path: 'settings', component: SettingsComponent },
        ]
    },
    { path: '**', redirectTo: 'dashboard' }
];
