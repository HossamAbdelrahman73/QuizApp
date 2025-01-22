import { Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared-service/shared.service';
import { IProfile } from '../../interfaces/iprofile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private _SharedService = inject(SharedService);
  profile: IProfile = {} as IProfile;
  showMenu: boolean =false;
  role: string = '';
  firstName: string = '';
  lastName: string = '';
  userName: string = ''
  ngOnInit(): void {
    this.profile = (localStorage.getItem('profile') as string)
      ? JSON.parse(localStorage.getItem('profile') as string)
      : undefined;
    this.role = this.profile.role as string
    this.firstName = this.profile.first_name as string
    this.lastName = this.profile.last_name as string
    this.userName = this.firstName  +  this.lastName
  }
}
