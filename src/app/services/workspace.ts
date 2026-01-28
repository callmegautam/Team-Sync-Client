import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStore } from '@/store/auth';
import { User } from '@/types/auth';
import { environment } from 'src/environment/environment.example';
import { AuthService } from './auth';
import { CreateWorkspacePayload, WorkspaceResponse, WorkspacesResponse } from '@/types/workspace';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  private readonly API_URL: string = `${environment.apicall}/workspaces`;
  user: User | null = null;

  constructor(
    private authStore: AuthStore,
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  currentWorkspace(): Observable<WorkspaceResponse> {
    this.authStore.user$.subscribe((user) => {
      this.user = user;
    });

    if (!this.authStore.snapshot) {
      this.authService.fetchUser().subscribe();
    }
    return this.http.get<WorkspaceResponse>(`${this.API_URL}/${this.user?.currentWorkspace}`);
  }

  createWorkspace(payload: CreateWorkspacePayload): Observable<WorkspaceResponse> {
    return this.http.post<WorkspaceResponse>(`${this.API_URL}`, payload);
  }

  getWorkspaces(): Observable<WorkspacesResponse> {
    return this.http.get<WorkspacesResponse>(`${this.API_URL}`);
  }
}
