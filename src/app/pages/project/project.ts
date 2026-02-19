import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { Component, inject, signal } from '@angular/core';
import { ZardDialogService } from '@/shared/components/dialog/dialog.service';

import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { CreateTask } from '@/shared/custom-components/task/create-task/create-task';
import { TaskBoard } from '@/shared/custom-components/task/task-board/task-board';
import { TaskTable } from '@/shared/custom-components/task/task-table/task-table';

@Component({
  selector: 'app-project',
  imports: [ZardButtonComponent, ZardIconComponent, TaskTable, TaskBoard],
  templateUrl: './project.html',
})
export class Project {
  private dialogService = inject(ZardDialogService);
  activeView = signal<'board' | 'table'>('board');
  openTask() {
    this.dialogService.create({
      zTitle: 'Create Task',
      zDescription: 'Create your own task',
      zContent: CreateTask,
      zWidth: '425px',
      zOkText: null,
      zCancelText: null,
      zClosable: true,
    });
  }
}
