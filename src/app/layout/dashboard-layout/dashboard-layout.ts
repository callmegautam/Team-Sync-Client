import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import {
  ZardBreadcrumbComponent,
  ZardBreadcrumbItemComponent,
} from '@/shared/components/breadcrumb/breadcrumb.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardDividerComponent } from '@/shared/components/divider/divider.component';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { LayoutComponent } from '@/shared/components/layout/layout.component';

import {
  SidebarComponent,
  SidebarGroupComponent,
} from '@/shared/components/layout/sidebar.component';
import { ZardMenuImports } from '@/shared/components/menu/menu.imports';
import { ZardSkeletonComponent } from '@/shared/components/skeleton/skeleton.component';
import { ZardTooltipDirective } from '@/shared/components/tooltip/tooltip';
import { Component, inject, signal } from '@angular/core';
import { ContentComponent } from '@/shared/components/layout/content.component';
import { ZardIcon } from '@/shared/components/icon/icons';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ɵInternalFormsSharedModule } from '@angular/forms';
import { ZardDialogService } from '@/shared/components/dialog/dialog.service';
import { Router, RouterOutlet } from '@angular/router';
import { Workspace } from '@/shared/custom-components/workspace/workspace';

interface MenuItem {
  icon: ZardIcon;
  label: string;
  link?: string;
  submenu?: { label: string; icon: ZardIcon }[];
}

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    LayoutComponent,
    CommonModule,
    SidebarComponent,
    SidebarGroupComponent,
    ZardButtonComponent,
    ZardAvatarComponent,
    ZardBreadcrumbComponent,
    ZardMenuImports,
    ZardIconComponent,
    ZardDividerComponent,
    ZardTooltipDirective,
    ContentComponent,
    ZardBreadcrumbItemComponent,
    LucideAngularModule,
    ɵInternalFormsSharedModule,
    RouterOutlet,
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  private dialogService = inject(ZardDialogService);
  readonly sidebarCollapsed = signal(false);

  constructor(private router: Router) {}

  workspaceMenuItems: MenuItem[] = [
    // {
    //   icon: 'layers',
    //   label: 'Workspace',
    //   submenu: [
    //     { icon: 'folder', label: 'My Workspace' },
    //     { icon: 'plus', label: 'Add Workspace' },
    //   ],
    // },
    { icon: 'layout-dashboard', label: 'Dashboard', link: '/dashboard' },
    {
      icon: 'folder',
      label: 'Projects',
      submenu: [
        { icon: 'folder', label: 'Design System' },
        { icon: 'folder', label: 'Mobile App' },
        { icon: 'folder', label: 'Website' },
      ],
    },
    { icon: 'circle-check', label: 'Tasks', link: 'dashboard/tasks' },
    { icon: 'users', label: 'Members', link: 'dashboard/members' },
    { icon: 'settings', label: 'Settings', link: 'dashboard/settings' },
  ];

  navigate(link?: string) {
    if (!link) return;
    this.router.navigate([link]);
  }

  toggleSidebar() {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  onCollapsedChange(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }

  openWorkspace() {
    this.dialogService.create({
      zTitle: 'Create Workspace',
      zDescription: 'create your own workspace',
      zContent: Workspace,
      zWidth: '425px',
      zOkText: null,
      zCancelText: null,
      zClosable: true,
    });
  }
}
