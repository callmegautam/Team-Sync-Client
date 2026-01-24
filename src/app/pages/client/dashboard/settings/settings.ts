import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { Component } from '@angular/core';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [
    ZardAvatarComponent,
    ZardInputDirective,
    ZardButtonComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  settingForm = new FormGroup({
    // workspaceAvatar: new FormControl(''),
    workspaceName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    workspaceDescription: new FormControl('', Validators.maxLength(255)),
    workspaceInvite: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
  });

  handleSetting() {
    const { workspaceName, workspaceDescription, workspaceInvite } = this.settingForm.value;
  }
}
