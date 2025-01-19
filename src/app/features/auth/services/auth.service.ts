import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IResetPassword } from '../interfaces/ireset-password';
import { IChangePassword } from '../interfaces/ichange-password';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _HttpClient = inject(HttpClient);
  onResetPassword(data: FormGroup): Observable<IResetPassword> {
    return this._HttpClient.post<IResetPassword>('api/auth/reset-password', data)
  }
  onChangePassword(data: FormGroup): Observable<IChangePassword> {
    return this._HttpClient.post<IChangePassword>('api/auth/change-password', data)
  }
  onForgetPassword(data: FormGroup): Observable<any> {
    return this._HttpClient.post('https://upskilling-egypt.com:3005/api/auth/forgot-password', data)
  }

  onSubmited(data: any): Observable<any> {
    return this._HttpClient.post(
      `https://upskilling-egypt.com:3005/api/auth/login`,
      data
    );
  }

}
