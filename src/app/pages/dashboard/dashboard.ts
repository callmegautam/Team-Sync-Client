import { Component, signal } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardDialogService } from '@/shared/components/dialog/dialog.service';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CreateProject } from '@/shared/custom-components/dashboard/create-project/create-project';
import { AuthStore } from '@/store/auth';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ZardButtonComponent, ZardIconComponent],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  constructor(
    private dialogService: ZardDialogService,
    private router: Router,
    private authStore: AuthStore,
  ) {}
  readonly activeTab = signal<'projects' | 'tasks' | 'members'>('projects');

  private resolveWorkspaceId(): string | null {
    let id = this.authStore.snapshot?.currentWorkspace ?? null;
    if (id && id.trim().length > 0) return id.trim();
    try {
      const raw = localStorage.getItem('auth_user');
      if (raw) {
        const parsed = JSON.parse(raw);
        id = parsed?.currentWorkspace ?? null;
        if (id && id.trim().length > 0) return id.trim();
      }
    } catch {}
    const candidates = [
      'workspace_id',
      'workspaceId',
      'currentWorkspace',
      'current_workspace',
      'currentWorkspaceId',
    ];
    for (const k of candidates) {
      const v = localStorage.getItem(k) || sessionStorage.getItem(k);
      if (v && v.trim().length > 0) return v.trim();
    }
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        const val = localStorage.getItem(key);
        if (!val) continue;
        try {
          const obj = JSON.parse(val);
          if (obj && typeof obj === 'object') {
            const cand =
              obj.currentWorkspace ||
              obj.workspaceId ||
              obj.workspace_id ||
              obj.current_workspace ||
              obj.id;
            if (cand && typeof cand === 'string' && cand.trim().length > 0) return cand.trim();
          }
        } catch {
          if (key.toLowerCase().includes('workspace') && val.trim().length > 0) return val.trim();
        }
      }
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (!key) continue;
        const val = sessionStorage.getItem(key);
        if (!val) continue;
        try {
          const obj = JSON.parse(val);
          if (obj && typeof obj === 'object') {
            const cand =
              obj.currentWorkspace ||
              obj.workspaceId ||
              obj.workspace_id ||
              obj.current_workspace ||
              obj.id;
            if (cand && typeof cand === 'string' && cand.trim().length > 0) return cand.trim();
          }
        } catch {
          if (key.toLowerCase().includes('workspace') && val.trim().length > 0) return val.trim();
        }
      }
      const w: any = window as any;
      const globalId =
        w.TEAMSYNC_WORKSPACE_ID ||
        w.workspaceId ||
        w.currentWorkspace ||
        w.CURRENT_WORKSPACE_ID ||
        null;
      if (globalId && typeof globalId === 'string' && globalId.trim().length > 0)
        return globalId.trim();
    } catch {}
    return null;
  }

  openProject() {
    console.log('Opening Create Project Dialog');
    const workspaceId = this.resolveWorkspaceId();
    if (workspaceId) {
      try {
        localStorage.setItem('workspace_id', workspaceId);
      } catch {}
    }
    this.dialogService.create({
      zTitle: 'Create Project',
      zDescription: 'Create your own project',
      zContent: CreateProject,
      zWidth: '425px',
      zData: { workspaceId },
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
