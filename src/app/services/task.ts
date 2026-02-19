import { CreateTaskPayload, TaskResponse } from '@/types/task';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API_URL: string = `${environment.apicall}/tasks`;

  constructor(private http: HttpClient) {}

  createTask(payload: CreateTaskPayload): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(`${this.API_URL}/`, payload);
  }

  getTask(): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.API_URL}/`);
  }
}
