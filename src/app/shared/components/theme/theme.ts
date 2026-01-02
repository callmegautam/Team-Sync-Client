// header.component.ts
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DarkModeOptions, EDarkModes, ZardDarkMode } from '@/shared/services/dark-mode';
import { ZardButtonComponent } from '../button/button.component';
import { ZardIconComponent } from '../icon/icon.component';

@Component({
  selector: 'z-theme',
  templateUrl: './theme.html',
  imports: [
    RouterModule,
    ZardButtonComponent,
    ZardIconComponent,
    /* other imports */
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent {
  private readonly darkModeService = inject(ZardDarkMode);

  toggleTheme(): void {
    this.darkModeService.toggleTheme();
  }
}
