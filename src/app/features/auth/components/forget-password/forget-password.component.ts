import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { authRoutes } from '../../routes/routes-enum';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  forgotPasswordForm: FormGroup;
  apiMessage: string = '';
  authService = inject(AuthService);
  toast = inject(ToastrService);
  router = inject(Router);
  constructor() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  onForgetPassword() {
    this.authService.onForgetPassword(this.forgotPasswordForm.value).subscribe({
      next: (msg: any) => {
        this.apiMessage = msg.message;
      },
      error: (err: any) => {
        this.toast.error(err.error.message);
      },
      complete: () => {
        this.toast.success(this.apiMessage)
        localStorage.setItem('email', this.forgotPasswordForm.get('email')?.value);
        this.router.navigate([authRoutes.RESET_PASSWORD]);
      }
    })
  }
}
