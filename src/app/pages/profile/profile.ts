import { AuthService } from '@/services/auth';
import { ErrorHandlerService } from '@/services/error-handler';
import { ProfileService } from '@/services/profile';
import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { Z_SHEET_DATA } from '@/shared/components/sheet';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

type ProfileFormControls = {
  name: FormControl<string>;
  username: FormControl<string>;
};
@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, ZardAvatarComponent],
  templateUrl: './profile.html',
})
export class Profile {
  private zData = inject(Z_SHEET_DATA);

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private errorHandleService: ErrorHandlerService,
  ) {}

  profileForm = new FormGroup<ProfileFormControls>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z ]+$/),
      ],
    }),

    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
      ],
    }),
  });

  ngOnInit() {
    if (this.zData) {
      this.profileForm.patchValue(this.zData);
    }

    this.authService.fetchUser().subscribe({
      next: (res) => {
        if (!res.data) {
          return console.log('Error');
        }

        this.profileForm.patchValue({
          name: res.data.name,
          username: res.data.username,
        });
      },
      error: (err) => {
        console.log(err);
        const errorMessage = this.errorHandleService.handleStatus(err.status);
        // toast.error(errorMessage);
      },
    });
  }
}
