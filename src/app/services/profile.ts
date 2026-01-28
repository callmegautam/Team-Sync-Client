import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStore } from '@/store/auth';
import { User } from '@/types/auth';
import { environment } from 'src/environment/environment.example';
import { AuthService } from './auth';
import { CreateWorkspacePayload, WorkspaceResponse, WorkspacesResponse } from '@/types/workspace';
import { ProfilePayload, ProfileResponse } from '@/types/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly API_URL: string = `${environment.apicall}/profile`;
  user: User | null = null;

  constructor(
    private authStore: AuthStore,
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  userProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${this.API_URL}`);
  }

  // whenever you use this api, make sure to update auth store
  updateProfile(payload: ProfilePayload): Observable<ProfileResponse> {
    return this.http.patch<ProfileResponse>(`${this.API_URL}`, payload);
  }

  // whenever you use this api, make sure to update auth store
  changeCurrentWorkspace(workspaceId: string): Observable<ProfileResponse> {
    return this.http.patch<ProfileResponse>(
      `${this.API_URL}/current-workspace/${workspaceId}/`,
      {},
    );
  }
}
