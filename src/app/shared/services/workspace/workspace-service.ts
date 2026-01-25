import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private http: HttpClient) {}
  api = environment.apicall;

  // workspaceId = localStorage.getItem('workspaceId');

  currentWorkspace(workspaceId: string) {
    return this.http.get<any>(`${this.api}/workspaces/${workspaceId}`);
  }
}
