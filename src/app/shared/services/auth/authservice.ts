import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';

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

  api = environment.apicall;

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.api}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data));
        }),
      );
  }
  register(data: RegisterType): Observable<any> {
    return this.http.post<any>(`${this.api}/auth/register`, data, { withCredentials: true }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data));
      }),
    );
  }

  user() {
    return this.http.get<any>(`${this.api}/auth/me`, { withCredentials: true }).pipe(
      tap((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
      }),
    );
  }
}
