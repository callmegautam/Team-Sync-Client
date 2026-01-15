import { ThemeComponent } from '@/shared/components/theme/theme';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
  

@Component({
  selector: 'app-home',
  imports: [RouterLink, ThemeComponent, ZardButtonComponent, ZardIconComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  year = new Date().getFullYear();
  openIndex = -1;
  setOpen(index: number, event: Event) {
    const target = event.target as HTMLDetailsElement;
    this.openIndex = target.open ? index : -1;
  }

}
