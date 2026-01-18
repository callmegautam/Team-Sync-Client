import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardDatePickerComponent } from '@/shared/components/date-picker';
import { Z_MODAL_DATA } from '@/shared/components/dialog/dialog.service';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { ZardSelectItemComponent } from '@/shared/components/select/select-item.component';
import { ZardSelectImports } from '@/shared/components/select/select.imports';
import { CommonModule } from '@angular/common';
import { inject, signal } from '@angular/core';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tasks',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ZardSelectImports,
    ZardSelectItemComponent,
    ZardDatePickerComponent,
    ZardInputDirective,
    ZardButtonComponent,
  ],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
})
export class CreateTask {
  private zData = inject(Z_MODAL_DATA);
  selectedDate = signal<Date | null>(null);
  projects = [
    { value: '1', label: 'project1' },
    { value: '2', label: 'project2' },
    { value: '3', label: 'project3' },
  ];

  members = [
    { value: '1', label: 'member1' },
    { value: '2', label: 'member2' },
    { value: '3', label: 'member3' },
  ];

  status = [
    { value: '1', label: 'Todo' },
    { value: '2', label: 'Pending' },
    { value: '3', label: 'Review' },
    { value: '4', label: 'Done' },
  ];

  priority = [
    { value: '1', label: 'Low' },
    { value: '2', label: 'Medium' },
    { value: '3', label: 'High' },
  ];

  onDateChange(date: Date | null) {
    this.selectedDate.set(date);
  }

  createTask = new FormGroup({
    taskTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', Validators.maxLength(255)),
    project: new FormControl('', Validators.required),
    assignedTo: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
  });

  ngAfterViewInit(): void {
    if (this.zData) {
      this.createTask.patchValue(this.zData);
    }
  }

  handleTask() {
    const { taskTitle, description, project, assignedTo, dueDate, status, priority } =
      this.createTask.value;
  }
}
