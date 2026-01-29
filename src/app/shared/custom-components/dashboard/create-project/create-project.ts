import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { Z_MODAL_DATA } from '@/shared/components/dialog/dialog.service';
import { ZardDialogRef } from '@/shared/components/dialog/dialog-ref';
import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { inject, Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { ProjectService } from '@/services/project';

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
  private zData = inject(Z_MODAL_DATA);
  private dialogRef = inject<ZardDialogRef<CreateProject>>(ZardDialogRef);

  constructor(private projectService: ProjectService) {}

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

  handleProject() {}
}
