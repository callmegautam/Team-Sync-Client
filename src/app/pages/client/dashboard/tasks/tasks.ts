import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { Component, inject } from '@angular/core';
import { ZardDialogService } from '@/shared/components/dialog/dialog.service';
import { CreateTask } from '@/shared/custom-components/create-task/create-task';

@Component({
  selector: 'app-tasks',
  imports: [ZardButtonComponent],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  private dialogService = inject(ZardDialogService);
  openTask() {
    this.dialogService.create({
      zTitle: 'Create Task',
      zDescription: 'create your own Task',
      zContent: CreateTask,
      zWidth: '425px',
      zOkText: null,
      zCancelText: null,
      zClosable: true,
    });
  }
}
