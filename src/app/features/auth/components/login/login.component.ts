import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { authRoutes } from '../../routes/routes-enum';
import { Ilogin } from '../../interfaces/ilogin';
import { SharedService } from '../../../../shared/services/shared-service/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authRoutes = authRoutes;
  showPassword: boolean = false;
  loggedInDetails: Ilogin = {} as Ilogin;
  role: string | undefined = '';
  loginForm = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  togglePassword = true;
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _SharedService: SharedService
  ) {}
  sendLoginData() {
    this._AuthService.onSubmited(this.loginForm.value).subscribe({
      next: (res) => {
        this.loggedInDetails = res;
        localStorage.setItem('token', this.loggedInDetails.data.accessToken);
        localStorage.setItem(
          'profile',
          JSON.stringify(this.loggedInDetails.data.profile)
        );
        this._SharedService.getProfile();
        this.role = this._SharedService.role;
        console.log(this.role);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error('Login Error', err.error.message);
      },
      complete: () => {
        this._ToastrService.success(this.loggedInDetails.message);
        if (this.role === 'Instructor') {
          this._Router.navigate(['/dashboard/instructor']);
        } else if (this.role === 'Student') {
          this._Router.navigate(['/dashboard/student']);
        }
      },
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
