import { ZardButtonComponent } from '@/shared/components/button/button.component';

import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { IconsModule } from '@/shared/components/icons';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { Authservice, RegisterType } from '@/shared/services/auth/authservice';
import { ErrorHandlerService } from '@/shared/services/error-handler/error.handler.service';
import { UserStore } from '@/stores/user.store';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ZardIconComponent,
    IconsModule,
    ZardButtonComponent,
    ZardInputDirective,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(
    private authService: Authservice,
    private router: Router,
    private userStore: UserStore,
    private errorHandleService: ErrorHandlerService,
  ) {}

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z ]+$/),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
      Validators.pattern(/^[a-zA-Z0-9_]+$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });
  handleRegister() {
    const data = this.registerForm.value as RegisterType;
    if (!data.name || !data.username || !data.email || !data.password) {
      toast('please enter all fields');
      return;
    }

    if (data.name && data.username && data.email && data.password)
      this.authService.register(data).subscribe({
        next: (res) => {
          toast.success('Register sucessfully !!!');
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
