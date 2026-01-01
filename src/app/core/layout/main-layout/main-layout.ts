
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, IconComponent],
    templateUrl: './main-layout.html',
})
export class MainLayoutComponent {
    isSidebarOpen = signal(false);

    menuItems = [
        { label: 'Dashboard', icon: 'layout-dashboard', route: '/dashboard' },
        { label: 'Tasks', icon: 'check-square', route: '/dashboard/tasks' },
        { label: 'Projects', icon: 'folder', route: '/dashboard/projects' },
        { label: 'Members', icon: 'users', route: '/dashboard/members' },
        { label: 'Workspace', icon: 'box', route: '/dashboard/workspace' },
        { label: 'Notification', icon: 'bell', route: '/dashboard/notification' },
        { label: 'Settings', icon: 'sliders', route: '/dashboard/settings' },
    ];

    toggleSidebar() {
        this.isSidebarOpen.update(v => !v);
    }
}
