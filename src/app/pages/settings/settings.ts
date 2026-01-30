import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { ApplicationRef, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Workspace } from '@/types/workspace';
import { WorkspaceService } from '@/services/workspace';
import { ProfileService } from '@/services/profile';
import { tap, switchMap } from 'rxjs';
import { AuthService } from '@/services/auth';
import { User } from '@/types/auth';
import { Router } from '@angular/router';
import { Navigation } from '@/shared/utils/navigation';
import { AuthStore } from '@/store/auth';

type SettingFormControls = {
  name: FormControl<string>;
  description: FormControl<string>;
  inviteCode: FormControl<string>;
};
@Component({
  selector: 'app-settings',
  imports: [
    ZardAvatarComponent,
    ZardInputDirective,
    ZardButtonComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './settings.html',
})
export class Settings implements OnInit {
  constructor(
    private workspaceService: WorkspaceService,
    private cdr: ChangeDetectorRef,
    private profileService: ProfileService,
    private authStore: AuthStore,
    private authService: AuthService,
    private router: Router,
    private navigation: Navigation,
    private appRef: ApplicationRef,
  ) {}

  settingForm = new FormGroup<SettingFormControls>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(255)],
    }),
    inviteCode: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    }),
  });

  workspace: Workspace | null = null;
  workspaces: Workspace[] | undefined = undefined;
  user: User | null = null;

  ngOnInit(): void {
    this.authStore.user$.subscribe((user) => {
      this.user = user;
    });

    if (!this.authStore.snapshot) {
      this.authService.fetchUser().subscribe();
    }

    this.workspaceService.currentWorkspace().subscribe({
      next: (res) => {
        if (!res.data) {
          return;
        }
        this.workspace = res.data;
        this.cdr.detectChanges();
      },
    });
  }

  handleSetting() {
    this.workspaceService.updateWorkspace(this.settingForm.getRawValue()).subscribe();
    console.log(this.settingForm.getRawValue());
  }

  deleteWorkspace() {
    this.workspaceService.getWorkspaces().subscribe({
      next: (res) => {
        this.workspaces = res.data;
        if (!this.workspaces || this.workspaces.length < 2) {
          throw new Error("You can't delete");
        }

        console.log('Deleting workspace');

        this.workspaceService.deleteWorkspace().subscribe();

        this.workspaces = this.workspaces.filter(
          (workspace) => workspace.id !== this.user?.currentWorkspace,
        );

        if (!this.workspaces || this.workspaces.length < 1) {
          throw new Error("You can't delete this");
        }

        console.log('Changing workspace');

        this.profileService.changeCurrentWorkspace(this.workspaces[0].id).subscribe({
          next: (res) => {
            this.workspaceService.notifyWorkspaceChanged();
          },
        });

        console.log('Deleted');

        this.workspace = this.workspaces[0];
        this.cdr.detectChanges();
        // this.router.navigate(['/settings']);
        // this.navigation.refreshRoute();
        console.log('refresh');
      },
    });
  }

  // deleteWorkspace() {
  //   this.workspaceService
  //     .getWorkspaces()
  //     .pipe(
  //       tap((res) => {
  //         this.workspaces = res.data;
  //         if (!this.workspaces || this.workspaces.length < 2) {
  //           throw new Error("You can't delete");
  //         }
  //       }),
  //       switchMap(() => this.workspaceService.deleteWorkspace()),
  //       switchMap(() => this.workspaceService.getWorkspaces()),
  //       tap((res) => (this.workspaces = res.data)),
  //       switchMap(() =>
  //         this.profileService.changeCurrentWorkspace(this.workspaces ? this.workspaces[0].id : ''),
  //       ),
  //     )
  //     .subscribe({
  //       next: () => {
  //         console.log('Deleted');
  //         this.cdr.detectChanges();
  //       },
  //       error: (err) => console.log(err.message || err),
  //     });
  // }
}
