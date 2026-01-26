import { Component, inject, signal } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardDialogService } from '@/shared/components/dialog/dialog.service';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { CreateProject } from '@/shared/custom-components/create-project/create-project';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ZardButtonComponent, ZardIconComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private dialogService = inject(ZardDialogService);
  private router = inject(Router);
  readonly activeTab = signal<'projects' | 'tasks' | 'members'>('projects');

  openProject() {
    console.log('Opening Create Project Dialog');
    this.dialogService.create({
      zTitle: 'Create Project',
      zDescription: 'Create your own project',
      zContent: CreateProject,
      zWidth: '425px',
      zOkText: null,
      zCancelText: null,
      zClosable: true,
    });
  }

  selectTab(tab: 'projects' | 'tasks' | 'members') {
    this.activeTab.set(tab);
  }

  openRecentTask() {
    this.router.navigate(['tasks']);
  }
}
