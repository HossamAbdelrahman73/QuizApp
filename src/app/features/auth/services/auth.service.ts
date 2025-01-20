import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IResetPassword } from '../interfaces/ireset-password';
import { IChangePassword } from '../interfaces/ichange-password';
import { IRegisterBody } from '../../interfaces/register-body.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _HttpClient = inject(HttpClient);

  onResetPassword(data: FormGroup): Observable<IResetPassword> {
    return this._HttpClient.post<IResetPassword>(
      'api/auth/reset-password',
      data
    );
  }

  onChangePassword(data: FormGroup): Observable<IChangePassword> {
    return this._HttpClient.post<IChangePassword>(
      'api/auth/change-password',
      data
    );
  }
  onForgetPassword(data: FormGroup): Observable<any> {
    return this._HttpClient.post('api/auth/forgot-password', data);
  }

  register(data: IRegisterBody) {
    return this._HttpClient.post('api/auth/register', data);
  }

  onSubmited(data: any): Observable<any> {
    return this._HttpClient.post(`api/auth/login`, data);
  }
}
