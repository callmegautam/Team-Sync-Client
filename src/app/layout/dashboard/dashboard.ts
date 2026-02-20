import { Profile } from '@/pages/profile/profile';
import { AuthService } from '@/services/auth';
import { ErrorHandlerService } from '@/services/error-handler';
import { ProfileService } from '@/services/profile';
import { ProjectService } from '@/services/project';
import { WorkspaceService } from '@/services/workspace';
import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import {
  ZardBreadcrumbComponent,
  ZardBreadcrumbItemComponent,
} from '@/shared/components/breadcrumb/breadcrumb.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardDialogService } from '@/shared/components/dialog/dialog.service';
import { ZardDividerComponent } from '@/shared/components/divider/divider.component';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { ContentComponent } from '@/shared/components/layout/content.component';
import { LayoutComponent } from '@/shared/components/layout/layout.component';
import {
  SidebarComponent,
  SidebarGroupComponent,
} from '@/shared/components/layout/sidebar.component';
import { ZardMenuImports } from '@/shared/components/menu/menu.imports';
import { ZardSheetService } from '@/shared/components/sheet';
import { ZardTooltipDirective } from '@/shared/components/tooltip/tooltip';
import { CreateWorkspace } from '@/shared/custom-components/workspace/create-workspace/create-workspace';
import { menuItems } from '@/shared/utils/workspace-menu-items';
import { AuthStore } from '@/store/auth';
import { User } from '@/types/auth';
import { ProfilePayload } from '@/types/profile';
import { Project } from '@/types/project';
import { CreateWorkspacePayload, Workspace } from '@/types/workspace';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ɵInternalFormsSharedModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

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
  templateUrl: './dashboard.html',
})
export class DashboardLayout implements OnInit {
  constructor(
    private authStore: AuthStore,
    private authService: AuthService,
    private workspaceService: WorkspaceService,
    private projectService: ProjectService,
    private errorHandleService: ErrorHandlerService,
    private router: Router,
    private sheetService: ZardSheetService,
    private profileService: ProfileService,
    private dialogService: ZardDialogService,
    private cdr: ChangeDetectorRef,
  ) {}

  sidebarCollapsed = signal(false);
  user: User | null = null;
  defaultWorkspace: Workspace | null | undefined = null;
  workspaces: Workspace[] | undefined = [];
  workspaceMenuItems = menuItems;
  projects: Project[] = [];

  ngOnInit() {
    this.authStore.user$.subscribe((user) => {
      this.user = user;
    });

    if (!this.authStore.snapshot) {
      this.authService.fetchUser().subscribe();
    }

    this.workspaceService.currentWorkspace().subscribe({
      next: (res) => {
        if (!res.data) {
          this.defaultWorkspace = null;
          const errorMessage = this.errorHandleService.handleStatus(401);
          // TODO: add toast message
        }
        this.defaultWorkspace = res.data;
        console.log(res.data);
        // this.workspaces =
        this.cdr.detectChanges();
      },
      error: (err) => {
        const errorMessage = this.errorHandleService.handleStatus(err.status);
        // TODO: add toast message
      },
    });

    this.loadWorkspaces();

    this.workspaceService.workspaceChanged$.subscribe(() => {
      this.loadWorkspaces();
      this.loadCurrentWorkspace();
    });
  }

  private loadCurrentWorkspace() {
    this.workspaceService.currentWorkspace().subscribe({
      next: (res) => {
        this.defaultWorkspace = res.data;

        this.cdr.detectChanges();
      },
    });
  }

  loadProjects(workspaceId: string | undefined) {
    console.log('Loading projects for workspace:', workspaceId);
    if (!workspaceId) return;

    this.projectService.getProjects(workspaceId).subscribe({
      next: (res) => {
        console.log('Projects response:', res);

        // Directly use res.data (no nested "data")
        if (res.data && Array.isArray(res.data)) {
          this.projects = res.data;
        } else {
          this.projects = [];
        }

        console.log('Projects array:', this.projects);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load projects', err);
        this.projects = [];
        this.cdr.detectChanges();
      },
    });
  }

  navigate(link?: string) {
    if (!link) return;
    this.router.navigate([link]);
  }

  navigateToProject(project: Project) {
    if (!project) return;

    this.router.navigate([`/dashboard/projects/${project.id}`]);
  }

  toggleSidebar() {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  onCollapsedChange(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }

  logout() {
    this.authStore.clear();
    this.router.navigate(['/login']);
  }

  openProfile() {
    this.sheetService.create({
      zTitle: 'Edit profile',
      zDescription: `Make changes to your profile here. Click save when you're done.`,
      zContent: Profile,
      zOkText: 'Save changes',
      zOnOk: (instance) => {
        const formValue = instance.profileForm.getRawValue();
        const data: ProfilePayload = {
          name: formValue.name,
          username: formValue.username,
          avatarUrl: formValue.avatarUrl,
        };

        this.profileService.updateProfile(data).subscribe({
          next: (res) => {
            console.log('Profile Updated: ', res.data);
            this.authService.fetchUser().subscribe();
          },
          error: (err) => {
            console.log(err);
            const errorMessage = this.errorHandleService.handleStatus(err.status);
            // toast.error(errorMessage);
          },
        });
      },

      zCancelText: 'Cancel',
    });
  }

  private loadWorkspaces() {
    this.workspaceService.getWorkspaces().subscribe({
      next: (res) => {
        if (!res.data) {
          return;
        }
        this.workspaces = res.data;
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.log(err);
        const errorMessage = this.errorHandleService.handleStatus(err.status);
      },
    });
  }

  openWorkspace() {
    this.dialogService.create({
      zTitle: 'Create Workspace',
      zDescription: 'Create your own workspace',
      zContent: CreateWorkspace,
      zWidth: '425px',
      zOkText: 'Create',
      zOnOk: (instance) => {
        const formValue = instance.workspaceForm.getRawValue();

        if (!formValue.name || formValue.name.trim().length < 3) {
          // toast.error('Workspace name must be at least 3 characters');
          return;
        }

        const data: CreateWorkspacePayload = {
          name: formValue.name.trim(),
          description: formValue.description || 'My default description',
          imageUrl: formValue.imageUrl || 'https://zardui.com/images/avatar/imgs/avatar_image.jpg',
        };

        this.workspaceService.createWorkspace(data).subscribe({
          next: (res) => {
            if (!res.data) {
              console.log('Error');
              return;
            }
            this.workspaces?.push(res.data);
            this.changeWorkspace(res.data.id);
            this.router.navigate(['dashboard']);
            this.cdr.detectChanges();
            console.log(res);
          },
          error: (err) => {
            console.log(err);
            const errorMessage = this.errorHandleService.handleStatus(err.status);
          },
        });
      },

      zCancelText: null,
      zClosable: true,
    });
  }

  changeWorkspace(workspaceId: string) {
    this.profileService.changeCurrentWorkspace(workspaceId).subscribe({
      next: (res) => {
        this.defaultWorkspace = res.data;
        this.cdr.detectChanges();
      },
    });
  }
}
