import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '@/types/auth';
import { environment } from 'src/environment/environment';
import { AuthService } from './auth';
import {
  CreateWorkspacePayload,
  UpdateWorkspacePayload,
  WorkspaceResponse,
  WorkspacesResponse,
} from '@/types/workspace';
import { AuthStore } from '@/store/auth';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  private readonly API_URL: string = `${environment.apicall}/workspaces`;
  user: User | null = null;
  private workspaceChangedSource = new Subject<void>();
  workspaceChanged$ = this.workspaceChangedSource.asObservable();

  constructor(
    private authStore: AuthStore,
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  notifyWorkspaceChanged() {
    this.workspaceChangedSource.next();
  }

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

  updateWorkspace(payload: UpdateWorkspacePayload): Observable<WorkspaceResponse> {
    console.log('I am called');

    this.authStore.user$.subscribe((user) => {
      this.user = user;
    });

    if (!this.authStore.snapshot) {
      this.authService.fetchUser().subscribe();
    }
    return this.http.patch<WorkspaceResponse>(
      `${this.API_URL}/${this.user?.currentWorkspace}`,
      payload,
    );
  }

  deleteWorkspace(): Observable<WorkspaceResponse> {
    this.authStore.user$.subscribe((user) => {
      this.user = user;
    });

    if (!this.authStore.snapshot) {
      this.authService.fetchUser().subscribe();
    }
    return this.http.delete<WorkspaceResponse>(`${this.API_URL}/${this.user?.currentWorkspace}`);
  }
}
