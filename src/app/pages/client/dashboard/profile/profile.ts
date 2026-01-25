import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { Z_SHEET_DATA } from '@/shared/components/sheet';
import { ErrorHandlerService } from '@/shared/services/error-handler/error.handler.service';
import { ProfileService } from '@/shared/services/profile/profile-service';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormControlName } from '@angular/forms';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, ZardAvatarComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private zData = inject(Z_SHEET_DATA);
  private profileService = inject(ProfileService);
  private errorHandleService = inject(ErrorHandlerService);
  profile = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
  });

  ngOnInit() {
    if (this.zData) {
      this.profile.patchValue(this.zData);
    }

    this.profileService.userProfile().subscribe({
      next: (res) => {
        console.log(res.data);
        this.profile.patchValue({
          name: res.data.name,
          username: res.data.username,
        });
      },
      error: (err) => {
        console.log(err);
        const errorMessage = this.errorHandleService.handleStatus(err.status);
        toast.error(errorMessage);
      },
    });
  }
}
