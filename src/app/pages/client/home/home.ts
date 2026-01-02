import { ThemeComponent } from '@/shared/components/theme/theme';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [ThemeComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
