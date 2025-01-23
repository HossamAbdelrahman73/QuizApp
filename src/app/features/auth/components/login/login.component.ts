import {  Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { authRoutes } from '../../routes/routes-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authRoutes = authRoutes;
  showPassword:boolean = false;
  loginForm = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  togglePassword = true;
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router : Router
    // private _authRoutes : authRoutes
  ) {}
  sendLoginData() {
    console.log(this.loginForm.value);
    this._AuthService.onSubmited(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message);
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('profile', JSON.stringify(res.data.profile));
        this._Router.navigate(['/dashboard/instructor']);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error('Login Error', err.error.message);
      },
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
