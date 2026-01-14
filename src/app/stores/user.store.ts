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

  setStore(data: User) {
    this.user.set(data);
  }
}
