import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlOptions, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  showPassword:boolean = false;
  emailUser: string| null = ""
  private _AuthService = inject(AuthService);
  private _ToastrService = inject(ToastrService);
  private _FormBuilder = inject(FormBuilder);
  private _Router = inject(Router)
  resetPasswordForm: FormGroup = this._FormBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ),
        ],
      ]
    }
  );
  public get formReset(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.resetPasswordForm.controls;
  }
  ngOnInit(): void {
   this.emailUser = localStorage.getItem('email')
   this.resetPasswordForm.patchValue({
    email: this.emailUser
   })
  }
  ResetPassword(data: FormGroup): void {
    if (this.resetPasswordForm.valid) {
      this._AuthService.onResetPassword(data.value).subscribe({
        next: (res) => {
        },
        error: (err) => {
          console.log(err);
          const errors = err.error.errors;
          if (errors) {
            if (errors.email) {
              this._ToastrService.error(errors.email, 'Email Error');
            } else if (errors.password) {
              this._ToastrService.error(errors.password, 'Password Error');
            }
          } else {
            this._ToastrService.error(
              err.error.message || 'An unexpected error occurred',
              'Error'
            );
          }
        },
        complete: () => {
          this._ToastrService.success('Reset Password');
          this._Router.navigate(['/auth/login']);
        },
      });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
