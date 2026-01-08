import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type RegisterType = {
  name: string;
  email: string;
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  constructor(private http: HttpClient) {}

  api = 'http://192.168.243.137:8080/api/v1/tenants/auth';

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.api}/login`, {
      email,
      password,
    });
  }
  register(data: RegisterType): Observable<any> {
    return this.http.post(`${this.api}/register`, data);
  }
}
