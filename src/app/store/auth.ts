import { User } from '@/types/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

const AUTH_KEY = 'auth_user';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly _user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    this.loadFromStorage(),
  );

  // Use this to fetch user data from localStorage
  readonly user$: Observable<User | null> = this._user$.asObservable();

  // Use this to check whether user is logged in or not
  readonly isAuthenticated$: Observable<boolean> = this.user$.pipe(
    map((user: User | null) => !!user),
  );

  private loadFromStorage(): User | null {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  // Use this to set user in localStorage
  setUser(user: User): void {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    this._user$.next(user);
  }

  // Use this to clear / logged out the user
  clear(): void {
    localStorage.removeItem(AUTH_KEY);
    this._user$.next(null);
  }

  // Use this to check recent snapshot
  get snapshot(): User | null {
    return this._user$.value;
  }
}
