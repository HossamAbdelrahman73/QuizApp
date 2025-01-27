import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { IUpdateProfile } from '../../interfaces/iprofile';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _HttpClient = inject(HttpClient)
  role: string | null = '';
  sideBarChanged: WritableSignal<boolean> = signal(true);
  onToggle(): void {
    this.sideBarChanged.update((value) => !value);
  }
  getProfile() {
    let finalToken: any = localStorage.getItem('token');
    let decodedToken: any = jwtDecode(finalToken);
    localStorage.setItem('userRole', decodedToken.role);
    this.role = localStorage.getItem('userRole');
  }

updateInstrucorProfile(data:IUpdateProfile) : Observable<any> {
return this._HttpClient.put('instructor', data)
}
updateStudentProfile(data:IUpdateProfile) : Observable<any> {
  return this._HttpClient.put('student', data)
  }
}
