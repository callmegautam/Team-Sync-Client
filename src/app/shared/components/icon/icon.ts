import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.html'
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: number | string = 24;
  @Input() class: string = '';

  private sanitizer = inject(DomSanitizer);

  get path(): SafeHtml {
    const innerContent = this.icons[this.name] || '';
    const svg = `
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="${this.size}" 
        height="${this.size}" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        class="${this.class}"
      >
        ${innerContent}
      </svg>
    `;
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  private icons: { [key: string]: string } = {
    'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />',
    'check-square': '<path d="m9 11 3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />',
    'folder': '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />',
    'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />',
    'box': '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" x2="12" y1="22.08" y2="12" />',
    'bell': '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />',
    'settings': '<path d="M12.22 2h-.44a2 2 0 0 1-2-2v.09a2 2 0 0 1-2 1.41 2 2 0 0 0-2.83 2.83l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 0 0 2.83l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 0-2.83 2.83h.09a2 2 0 0 1 1.41 2 2 0 0 0 2.83 2.83l-.06.06a2 2 0 0 1 0 2.83 2 2 0 0 0 0 2.83l.06.06a2 2 0 0 1 2.83 0 2 2 0 0 0 2.83-2.83v-.09a2 2 0 0 1 2-2h.09a2 2 0 0 1 2 2v.09a2 2 0 0 0 2.83 2.83l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 0 2.83-2.83l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 0 0-2.83l.06-.06a2 2 0 0 1-2.83 0 2 2 0 0 0-2.83-2.83h-.09a2 2 0 0 1-1.41-2 2 2 0 0 0-2.83-2.83l.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 0 0-2.83l-.06-.06a2 2 0 0 1-2.83 0 2 2 0 0 0-2.83 2.83Z" /><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />',
    'search': '<circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />',
    'menu': '<line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />',
    'x': '<path d="M18 6 6 18" /><path d="m6 6 12 12" />',
    'chevron-right': '<path d="m9 18 6-6-6-6" />',
    'gift': '<rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 4.8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />',
    'help-circle': '<circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" />',
    'eye': '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" />',
    'dollar-sign': '<line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />',
    'activity': '<path d="M22 12h-4l-3 9L9 3l-3 9H2" />',
    'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />',
    'trending-down': '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" />',
    'more-horizontal': '<circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />',
    'filter': '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />',
    'arrow-up-right': '<path d="M7 7h10v10" /><path d="M7 17 17 7" />',
    'arrow-down-right': '<path d="m7 7 10 10" /><path d="M17 7v10H7" />',
    'arrow-right': '<path d="M5 12h14" /><path d="m12 5 7 7-7 7" />',
    'wallet': '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" /><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />',
    'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />',
    'smartphone': '<rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />',
    'sliders': '<line x1="4" x2="20" y1="21" y2="21" /><line x1="4" x2="20" y1="14" y2="14" /><line x1="4" x2="20" y1="7" y2="7" /><circle cx="12" cy="14" r="2" /><circle cx="12" cy="7" r="2" /><circle cx="12" cy="21" r="2" />'
  };
}
