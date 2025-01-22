import { Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared-service/shared.service';
import { IDataSidebar } from '../../interfaces/idata-sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private _SharedService = inject(SharedService);
  menu: IDataSidebar[] = [];
  valueSideBarChanged: any = this._SharedService.sideBarChanged;
  constructor(){
    this._SharedService.getProfile()
  }
  isStudent(): boolean {
    return this._SharedService.role === 'Student' ? true : false;
  }
  isInstructor(): boolean {
    return this._SharedService.role === 'Instructor' ? true : false;
  }
  toggleSideBar(): void {
    this._SharedService.onToggle();
  }
  ngOnInit(): void {
    this.menu = [
      {
        link: '/dashboard/home',
        text: 'Dashboard',
        image:'../../../../assets/images/sidebar-images/Dashboard icon.svg',
        isActive: this.isInstructor() || this.isStudent(),
      },
      {
        link: '/dashboard/',
        text: 'Students',
        image:'../../../../assets/images/sidebar-images/Students icon.svg',
        isActive: this.isInstructor(),
      },
      {
        link: '/dashboard/',
        text: 'Groups',
        image:'../../../../assets/images/sidebar-images/Students icon.svg',
        isActive: this.isInstructor()
      },

      {
        link: '/dashboard',
        text: 'Quizzes',
        image:'../../../../assets/images/sidebar-images/Quiz icon.svg',
        isActive: this.isInstructor()|| this.isStudent(),
      },
      {
        link: '/dashboard/',
        text: 'Results',
        image:'../../../../assets/images/sidebar-images/Results icon.svg',
        isActive: this.isInstructor()|| this.isStudent(),
      },
    ];
  }
}
