import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceService } from '@/services/workspace';
import { Workspace } from '@/types/workspace';
import { AuthStore } from '@/store/auth';
import { User } from '@/types/auth';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { ZardInputDirective } from '@/shared/components/input/input.directive';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, ZardIconComponent, ZardInputDirective],
  templateUrl: './members.html',
})
export class Members implements OnInit {
  constructor(
    private workspaceService: WorkspaceService,
    private authStore: AuthStore,
  ) {}

  workspace: Workspace | null = null;
  owner: User | null = null;

  ngOnInit(): void {
    this.owner = this.authStore.snapshot;

    this.authStore.user$.subscribe((user) => {
      this.owner = user;
    });

    this.workspaceService.currentWorkspace().subscribe({
      next: (res) => {
        this.workspace = res.data ?? null;
      },
    });
  }

  get inviteLink(): string {
    const code = this.workspace?.inviteCode?.trim();
    return code ? `https://teamsync.com/invite/${code}` : 'https://teamsync.com/invite/';
  }

  copyInviteLink(): void {
    const value = this.inviteLink?.trim();
    if (!value) return;
    if (!navigator?.clipboard) return;
    navigator.clipboard.writeText(value);
  }
}
