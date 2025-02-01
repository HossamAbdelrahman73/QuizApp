import { FormControl, FormGroup, Validators } from '@angular/forms';
import { authRoutes } from './../../routes/routes-enum';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authRoutes = authRoutes;
  registerForm: FormGroup;
  isPasswordVisible = false;

  constructor(private _router: Router, private _authService: AuthService, private _toast: ToastrService) {
    this.registerForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    })
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSignUp() {
    this._authService.register(this.registerForm.value).subscribe({
      error: (err) => {
        this._toast.error(err.error.message);
      },
      complete: () => {
        this._toast.success('User registered successfully');
        this._router.navigate([authRoutes.LOGIN]);
      }
    })
  }
}
