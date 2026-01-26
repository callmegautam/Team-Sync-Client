import { Injectable, signal } from '@angular/core';
type User = {
  id: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  user = signal<User>({
    id: '',
  });

  constructor() {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user.set(JSON.parse(storedUser));
      }
    }
  }

  setStore(data: User) {
    this.user.set(data);
    localStorage.setItem('user', JSON.stringify(data));
  }

  getUserData() {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('user');
      if (!local) {
        return null;
      }
      return JSON.parse(local);
    }
  }

  clear() {
    this.user.set({
      id: '',
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
}