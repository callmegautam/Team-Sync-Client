import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { IconsModule } from '@/shared/components/icons';
import { ZardCheckboxComponent } from '@/shared/components/checkbox/checkbox.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { Authservice } from '@/shared/services/auth/authservice';
import { UserStore } from '@/stores/user.store';
import { toast } from 'ngx-sonner';
import { ErrorHandlerService } from '@/shared/services/error-handler/error.handler.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ZardInputDirective,
    ZardIconComponent,
    IconsModule,
    ZardCheckboxComponent,
    ZardButtonComponent,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private authService: Authservice,
    private router: Router,
    private userStore: UserStore,
    private errorHandleService: ErrorHandlerService,
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });
  handleLogin() {
    const { email, password } = this.loginForm.value;

    if (!email || !password) {
      toast('Please enter email and password');
      return;
    }

    this.authService.login(email, password).subscribe({
      next: (res) => {
        toast.success('Successful Login!!!');
        this.userStore.setStore(res.data);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        const errorMessage = this.errorHandleService.handleStatus(err.status);
        toast.error(errorMessage);
      },
    });
  }
}
