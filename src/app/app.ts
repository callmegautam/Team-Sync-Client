import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthResponse } from './types/auth';
import { AuthStore } from './store/auth';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  // styleUrl: '../styles.css',
  styleUrl: '../styles.css',
})
export class App implements OnInit {
  user: AuthResponse | null = null;

  constructor(
    private authStore: AuthStore,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // Option 1: Subscribe to reactive updates
    // this.authStore.user$.subscribe((user) => {
    //   this.user = user;
    // });

    // // Option 2: Fetch user from API if not already loaded
    // if (!this.authStore.snapshot) {
    //   this.authService.fetchUser().subscribe();
    // }

    console.log('App is running');
  }
}
