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
      const storedUser = localStorage.getItem('userID');
      if (storedUser) {
        this.user.set(JSON.parse(storedUser));
      }
    }
  }

  setStore(data: User) {
    this.user.set(data);
    if (typeof window !== 'undefined') {
      localStorage.setItem('userID', JSON.stringify(data.id));
    }
  }

  clear() {
    this.user.set({
      id: '',
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userID');
      localStorage.removeItem('token');
    }
  }
}
