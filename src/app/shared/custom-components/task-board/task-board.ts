import { Component } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

interface KanbanTask {
  id: number;
  title: string;
  description: string;
  tag: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

@Component({
  selector: 'app-task-board',
  imports: [CommonModule, DragDropModule],
  templateUrl: './task-board.html',
  styleUrl: './task-board.css',
})
export class TaskBoard {
  columns = [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: 1,
          title: 'login',
          description: 'login is todo',
          tag: 'task 1',
        },
      ],
    },
    {
      id: 'progress',
      title: 'In Progress',
      tasks: [
        {
          id: 2,
          title: 'register',
          description: 'register is in progress',
          tag: 'task 2',
        },
      ],
    },
    {
      id: 'review',
      title: 'Need Review',
      tasks: [],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [],
    },
  ];

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
