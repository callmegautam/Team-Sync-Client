import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { Z_MODAL_DATA } from '@/shared/components/dialog/dialog.service';
import { ZardDialogRef } from '@/shared/components/dialog/dialog-ref';
import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { inject, Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { ErrorHandlerService } from '@/shared/services/error-handler/error.handler.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-create-project',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ZardInputDirective,
    ZardAvatarComponent,
    ZardButtonComponent,
  ],
  templateUrl: './create-project.html',
  styleUrl: './create-project.css',
})
export class CreateProject {
  private zData = inject(Z_MODAL_DATA);
  private dialogRef = inject<ZardDialogRef<CreateProject>>(ZardDialogRef);
  private http = inject(HttpClient);
  private errorHandler = inject(ErrorHandlerService);
  private api = environment.apicall;

  createProject = new FormGroup({
    projectTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', Validators.maxLength(255)),
    imageUrl: new FormControl(''),
  });

  readonly loading = signal(false);

  ngAfterViewInit(): void {
    if (this.zData) {
      this.createProject.patchValue(this.zData);
    }
  }

  handleProject() {
    const { projectTitle, description, imageUrl } = this.createProject.value;

    if (!projectTitle) {
      toast('Project title is required');
      return;
    }

    this.loading.set(true);
    this.http
      .post<any>(
        `${this.api}/projects`,
        {
          title: projectTitle,
          description,
          imageUrl,
        },
        { withCredentials: true },
      )
      .subscribe({
        next: (res) => {
          toast.success('Project created');
          this.loading.set(false);
          this.dialogRef?.close(res.data ?? res);
        },
        error: (err) => {
          this.loading.set(false);
          const msg = this.errorHandler.handleStatus(err.status);
          toast.error(msg);
        },
      });
  }
}
