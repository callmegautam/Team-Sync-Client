import { ZardTableImports } from '@/shared/components/table/table.imports';
import { Component } from '@angular/core';

interface taskTable {
  title: string;
  project: string;
  assigned_to: string;
  due_date: string;
  status: string;
  priority: string;
  key: string;
}

@Component({
  selector: 'app-task-table',
  imports: [ZardTableImports],
  templateUrl: './task-table.html',
  styleUrl: './task-table.css',
})
export class TaskTable {
  listOfData: taskTable[] = [
    {
      key: '1',
      title: 'abc',
      project: 'abc',
      assigned_to: 'raja',
      due_date: '12 - 2 - 4',
      status: 'todo',
      priority: 'high',
    },
  ];
}
