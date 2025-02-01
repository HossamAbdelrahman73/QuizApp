import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  showPassword:boolean = false;
  showConfirmPassword:boolean = false;
  private _AuthService = inject(AuthService);
  private _FormBuilder = inject(FormBuilder);
  private _Router = inject(Router);
  private _ToastrService = inject(ToastrService);
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  resMessage: string = '';
  changePasswordForm: FormGroup = this._FormBuilder.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ),
        ],
      ],
      password_new: [''],
    },
    { validator: [this.checkPassword] } as FormControlOptions
  );
  checkPassword(group: AbstractControl) {
    const password = group.get('password');
    const password_new = group.get('password_new');
    if (password_new?.value === '') {
      password_new?.setErrors({ required: true });
    } else if (password_new?.value !== password?.value) {
      password_new?.setErrors({ mismatch: true });
    }
  }
  public get formChange(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.changePasswordForm.controls;
  }
  changePassword(data: FormGroup): void {
    if (this.changePasswordForm.valid) {
      this._AuthService.onChangePassword(data.value).subscribe({
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
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
