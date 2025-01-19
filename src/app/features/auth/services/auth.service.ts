import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterBody } from '../../interfaces/register-body.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  register(data: IRegisterBody) {
    return this._http.post('https://upskilling-egypt.com:3005/api/auth/register', data);
  }
}
