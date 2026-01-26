import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}
  api = environment.apicall;

  // token = localStorage.getItem('token');

  userProfile() {
    return this.http.get<any>(`${this.api}/profile`, {
      withCredentials: true,
    });
  }

  updateProfile(data: { name: string; username: string }): Observable<any> {
    return this.http.patch<any>(`${this.api}/profile`, data, { withCredentials: true });
  }
}
