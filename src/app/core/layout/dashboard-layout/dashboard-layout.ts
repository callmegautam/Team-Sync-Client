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
  SidebarGroupLabelComponent,
} from '@/shared/components/layout/sidebar.component';
import { ZardMenuLabelComponent } from '@/shared/components/menu/menu-label.component';
import { ZardMenuImports } from '@/shared/components/menu/menu.imports';
import { ZardSkeletonComponent } from '@/shared/components/skeleton/skeleton.component';
import { ZardTooltipComponent, ZardTooltipDirective } from '@/shared/components/tooltip/tooltip';
import { Component, signal } from '@angular/core';
import { ContentComponent } from '@/shared/components/layout/content.component';
import { ZardIcon } from '@/shared/components/icon/icons';
import { LucideIcons, LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

interface MenuItem {
  icon: ZardIcon;
  label: string;
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
    ZardSkeletonComponent,
    ZardDividerComponent,
    ZardTooltipDirective,
    ContentComponent,
    ZardBreadcrumbItemComponent,
    LucideAngularModule,
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  readonly sidebarCollapsed = signal(false);

  workspaceMenuItems: MenuItem[] = [
    // {
    //   icon: 'layers',
    //   label: 'Workspace',
    //   submenu: [
    //     { icon: 'folder', label: 'My Workspace' },
    //     { icon: 'plus', label: 'Add Workspace' },
    //   ],
    // },
    { icon: 'layout-dashboard', label: 'Dashboard' },
    {
      icon: 'folder',
      label: 'Projects',
      submenu: [
        { icon: 'folder', label: 'Design System' },
        { icon: 'folder', label: 'Mobile App' },
        { icon: 'folder', label: 'Website' },
      ],
    },
    { icon: 'circle-check', label: 'Tasks' },
    { icon: 'users', label: 'Members' },
    { icon: 'settings', label: 'Settings' },
  ];

  toggleSidebar() {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  onCollapsedChange(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }
}
