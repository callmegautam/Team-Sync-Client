import { Injectable, signal } from '@angular/core';
type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  currentworkspace: string;
  avtarurl: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  user = signal<User>({
    id: '',
    name: '',
    username: '',
    email: '',
    currentworkspace: '',
    avtarurl: '',
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(data));
    }
  }

  clear() {
    this.user.set({
      id: '',
      name: '',
      username: '',
      email: '',
      currentworkspace: '',
      avtarurl: '',
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  }
}
