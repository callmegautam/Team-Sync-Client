import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { Z_MODAL_DATA } from '@/shared/components/dialog/dialog.service';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-workspace',
  imports: [ReactiveFormsModule, CommonModule, ZardInputDirective, ZardButtonComponent],
  templateUrl: './workspace.html',
  styleUrl: './workspace.css',
})
export class Workspace {
  private zData = inject(Z_MODAL_DATA);
  createWorkspace = new FormGroup({
    workspaceName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', Validators.maxLength(255)),
  });
  ngAfterViewInit(): void {
    if (this.zData) {
      this.createWorkspace.patchValue(this.zData);
    }
  }

  handleWorkspace() {
    const { workspaceName, description } = this.createWorkspace.value;
  }
}
