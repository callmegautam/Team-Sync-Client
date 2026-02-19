import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CreateProjectPayload, ProjectResponse } from '../types/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly API_URL: string = `${environment.apicall}/projects`;
  constructor(private http: HttpClient) {}

  createProject(workspaceId: string, payload: CreateProjectPayload): Observable<ProjectResponse> {
    return this.http.post<ProjectResponse>(`${this.API_URL}/${workspaceId}`, payload);
  }
}
