import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { Z_MODAL_DATA } from '@/shared/components/dialog/dialog.service';
import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { CommonModule } from '@angular/common';
import { inject, signal, Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ZardAvatarComponent,
    ZardInputDirective,
    ZardButtonComponent,
  ],
  templateUrl: './create-project.html',
  styleUrl: './create-project.css',
})
export class CreateProject {
  private zData = inject(Z_MODAL_DATA);
  selectedDate = signal<Date | null>(null);

  constructor() {
    console.log('CreateProject instantiated');
  }

  priority = [
    { value: '1', label: 'Low' },
    { value: '2', label: 'Medium' },
    { value: '3', label: 'High' },
  ];

  status = [
    { value: 'active', label: 'Active' },
    { value: 'on_hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' },
  ];

  onDateChange(date: Date | null) {
    this.selectedDate.set(date);
  }

  createProject = new FormGroup({
    projectTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', Validators.maxLength(255)),
    imageUrl: new FormControl(''),
  });

  ngAfterViewInit(): void {
    if (this.zData) {
      this.createProject.patchValue(this.zData);
    }
  }

  handleProject() {
    if (this.createProject.valid) {
      console.log(this.createProject.value);
    }
  }
}
