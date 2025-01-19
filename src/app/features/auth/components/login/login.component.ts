import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService
  ) {}

  test() {
    console.log(localStorage.getItem('token'));
  }

  sendLoginData() {
    console.log(this.loginForm.value);
    this._AuthService.onSubmited(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message);
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('profile', JSON.stringify(res.data.profile));
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error('Login Error', err.error.message);
      },
    });
  }
}
