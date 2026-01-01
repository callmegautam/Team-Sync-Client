import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './tasks.html',
})
export class TasksComponent { }
