import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { Z_MODAL_DATA } from '@/shared/components/dialog/dialog.service';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';

type WorkspaceFormControls = {
  name: FormControl<string>;
  description: FormControl<string | null>;
};

@Component({
  selector: 'app-create-workspace',
  imports: [ReactiveFormsModule, CommonModule, ZardInputDirective],
  templateUrl: './create-workspace.html',
})
export class CreateWorkspace {
  private zData = inject(Z_MODAL_DATA);

  workspaceForm = new FormGroup<WorkspaceFormControls>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z ]+$/),
      ],
    }),

    description: new FormControl('', {
      nonNullable: false,

      validators: [
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
      ],
    }),
  });

  ngAfterViewInit(): void {
    if (this.zData) {
      this.workspaceForm.patchValue(this.zData);
    }
  }
}
