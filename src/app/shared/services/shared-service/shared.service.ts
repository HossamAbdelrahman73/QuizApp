import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  role: string | null = '';
  sideBarChanged: WritableSignal<boolean> = signal(true);
  private _HttpClient = inject(HttpClient)
  onToggle(): void {
    this.sideBarChanged.update((value) => !value);
  }
  getProfile() {
    let finalToken: any = localStorage.getItem('token');
    let decodedToken: any = jwtDecode(finalToken);
    console.log(decodedToken);
    localStorage.setItem('userRole', decodedToken.role);
    this.role = localStorage.getItem('userRole')
  }
  onGetTopFiveStudents(): Observable<any>{
    return this._HttpClient.get<any>("student/top-five");
  }

  onGetFiveIncomingQuiz(): Observable<any>{
    return this._HttpClient.get<any>("quiz/incomming");
  }
}
