import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validator,
  Validators,
} from '@angular/forms';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { IconsModule } from '@/shared/components/icons';
import { ZardCheckboxComponent } from '@/shared/components/checkbox/checkbox.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ZardInputDirective,
    ZardIconComponent,
    IconsModule,
    ZardCheckboxComponent,
    ZardButtonComponent,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });
  handleLogin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  }
}
