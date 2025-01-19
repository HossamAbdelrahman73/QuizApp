import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  onSubmited(data: any): Observable<any> {
    return this._HttpClient.post(
      `https://upskilling-egypt.com:3005/api/auth/login`,
      data
    );
  }
}
