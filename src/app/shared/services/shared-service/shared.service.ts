import { Injectable, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
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


}
