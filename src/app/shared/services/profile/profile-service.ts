import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}
  api = environment.apicall;

  token = localStorage.getItem('token');

  userProfile() {
    return this.http.get<any>(`${this.api}/profile`, {
      withCredentials: true,
    });
  }
}
