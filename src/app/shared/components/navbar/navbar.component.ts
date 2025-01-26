import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SharedService } from '../../services/shared-service/shared.service';
import { IProfile } from '../../interfaces/iprofile';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private _SharedService = inject(SharedService);
  private _Router = inject(Router);
  dialog = inject(MatDialog);
  routerSubscription!: Subscription;
  profile: IProfile = {} as IProfile;
  showMenu: boolean = false;
  role: string = '';
  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  currentPath: string = '';
  sectionTitle: string = '';
  public currentTime = new Date();
  constructor() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
  ngOnInit(): void {
    this.profile = (localStorage.getItem('profile') as string)
      ? JSON.parse(localStorage.getItem('profile') as string)
      : undefined;
    this.role = this.profile.role as string;
    this.firstName = this.profile.first_name as string;
    this.lastName = this.profile.last_name as string;
    this.userName = this.firstName + this.lastName;
    this.getUrl();
  }
  getUrl(): void {
    this.routerSubscription = this._Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects;
      }else if (!(event instanceof NavigationEnd)){
        this.currentPath = this._Router.url
      }
      this.getSectionTitle();
    });
  }
  getSectionTitle(): void {
    const urlParts = this.currentPath.split('/');
    if (urlParts.length < 5) {
      this.sectionTitle = urlParts[urlParts.length - 1];
    } else if (urlParts.length === 5) {
      this.sectionTitle = urlParts[urlParts.length - 2];
    }
  }
  logout(): void {
    localStorage.clear();
    this._Router.navigate(['/auth/login']);
  }
  changePassword() {
    this._Router.navigate(['/auth/change-password']);
  }
  openDialogToUpdateProfile():void {
    this.dialog.open(UpdateProfileComponent, {
    });
  }
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
