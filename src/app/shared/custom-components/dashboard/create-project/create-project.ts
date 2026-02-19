import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { Z_MODAL_DATA } from '@/shared/components/dialog/dialog.service';
import { ZardDialogRef } from '@/shared/components/dialog/dialog-ref';
import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { Component, signal, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { AuthStore } from '@/store/auth';
import { CreateProjectPayload } from '../../../../types/project';
import { ProjectService } from '@/services/project';
import { environment } from 'src/environment/environment';

type ProjectFormControls = {
  title: FormControl<string>;
  description: FormControl<string | null>;
  imageUrl: FormControl<string | null>;
};

@Component({
  selector: 'app-create-project',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ZardInputDirective,
    ZardAvatarComponent,
    ZardButtonComponent,
  ],
  templateUrl: './create-project.html',
})
export class CreateProject {
  constructor(
    @Inject(Z_MODAL_DATA) private zData: any,
    private dialogRef: ZardDialogRef<CreateProject>,
    private authStore: AuthStore,
    private projectService: ProjectService,
  ) {}

  projectForm = new FormGroup<ProjectFormControls>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1), Validators.maxLength(255)],
    }),
    description: new FormControl('', {
      nonNullable: false,
      validators: [Validators.maxLength(255)],
    }),
    imageUrl: new FormControl(''),
  });

  readonly loading = signal(false);
  readonly message = signal<string | null>(null);

  private resolveAnyWorkspaceId(): string | null {
    const a =
      (this.zData && this.zData.workspaceId) ||
      this.authStore.snapshot?.currentWorkspace ||
      localStorage.getItem('workspace_id') ||
      sessionStorage.getItem('workspace_id') ||
      null;
    return a ? a.trim() : null;
  }
  ngAfterViewInit(): void {
    if (this.zData) {
      this.projectForm.patchValue(this.zData);
    }
  }

  handleProject() {
    if (this.projectForm.invalid) {
      this.message.set('Please fill the required fields');
      return;
    }

    const formValue = this.projectForm.getRawValue();
    const payload: CreateProjectPayload = { name: formValue.title.trim() };
    if (formValue.description && formValue.description.trim().length > 0) {
      payload.description = formValue.description.trim();
    }
    if (formValue.imageUrl && formValue.imageUrl.trim().length > 0) {
      payload.imageUrl = formValue.imageUrl.trim();
    }

    let workspaceId = this.resolveAnyWorkspaceId();
    if (!workspaceId) {
      this.message.set('Not authenticated or workspace missing');
      return;
    }

    console.log('Create project payload', payload);

    this.loading.set(true);
    this.message.set('Creating project…');
    this.projectService.createProject(workspaceId, payload).subscribe({
      next: (res) => {
        console.log('Create project response', res);
        this.loading.set(false);
        this.message.set('Project created');
        this.dialogRef.close((res as any) ?? null);
      },
      error: (err) => {
        this.loading.set(false);
        this.message.set(err?.error?.error || err?.error?.message || 'Failed to create project');
      },
    });
  }
}
