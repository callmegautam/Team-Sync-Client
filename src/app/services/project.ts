import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly API_URL: string = `${environment.apicall}/projects`;
}
