import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { Z_MODAL_DATA } from '@/shared/components/dialog/dialog.service';
import { ZardDialogRef } from '@/shared/components/dialog/dialog-ref';
import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { Component, signal, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { ProjectService } from '@/services/project';
import { AuthStore } from '@/store/auth';
import { ErrorHandlerService } from '@/services/error-handler';
import { CreateProjectPayload, ProjectResponse } from '../../../../types/project';

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
    private projectService: ProjectService,
    private authStore: AuthStore,
    private errorHandleService: ErrorHandlerService,
  ) {}

  projectForm = new FormGroup<ProjectFormControls>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    }),
    description: new FormControl('', {
      nonNullable: false,
      validators: [Validators.maxLength(255)],
    }),
    imageUrl: new FormControl(''),
  });

  readonly loading = signal(false);

  ngAfterViewInit(): void {
    if (this.zData) {
      this.projectForm.patchValue(this.zData);
    }
  }

  handleProject() {
    if (this.projectForm.invalid) {
      return;
    }

    const formValue = this.projectForm.getRawValue();
    const payload: CreateProjectPayload = {
      title: formValue.title.trim(),
      description: formValue.description || null,
      imageUrl: formValue.imageUrl || null,
    };

    const workspaceId =
      (this.zData && this.zData.workspaceId) || this.authStore.snapshot?.currentWorkspace;
    if (!workspaceId) {
      const errorMessage = this.errorHandleService.handleStatus(401);
      console.log(errorMessage);
      return;
    }

    this.loading.set(true);
    this.projectService.createProject(workspaceId, payload).subscribe({
      next: (res: ProjectResponse) => {
        this.loading.set(false);
        this.dialogRef.close(res.data);
      },
      error: (err: any) => {
        this.loading.set(false);
        const errorMessage = this.errorHandleService.handleStatus(err.status);
        console.log(errorMessage);
      },
    });
  }
}
