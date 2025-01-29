import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { IProfile, IUpdateProfile } from '../../interfaces/iprofile';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _HttpClient = inject(HttpClient);
  role: string | undefined = '';
  lastName: string | undefined = '';
  profile: IProfile = {} as IProfile;
  sideBarChanged: WritableSignal<boolean> = signal(true);
  onToggle(): void {
    this.sideBarChanged.update((value) => !value);
  }
  getProfile() {
    this.profile = JSON.parse(localStorage.getItem('profile') as string);
    this.role = this.profile.role;
    this.lastName = this.profile.last_name;
    localStorage.setItem('role', this.role as string)
    localStorage.setItem('lastName', this.lastName as string)
  }
  updateInstrucorProfile(data: IUpdateProfile): Observable<any> {
    return this._HttpClient.put('instructor', data);
  }
  updateStudentProfile(data: IUpdateProfile): Observable<any> {
    return this._HttpClient.put('student', data);
  }
}
