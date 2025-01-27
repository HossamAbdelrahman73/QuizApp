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
  constructor() {
    this._SharedService.getProfile();
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
    this.isInstructor();
    this.isStudent();
    this.menu = [
      {
        link: '/dashboard/instructor/home',
        image: '../../../../assets/images/sidebar-images/Dashboard icon.svg',
        text: 'home',
        isActive: this.isInstructor(),
      },
      {
        link: this.isInstructor()
          ? '/dashboard/instructor/quizzes'
          : '/dashboard/student/home',
        image: '../../../../assets/images/sidebar-images/Quiz icon.svg',
        text: 'quizzes',
        isActive: this.isInstructor() || this.isStudent(),
      },
      {
        link: '/dashboard/instructor/groups',
        image: '../../../../assets/images/sidebar-images/Students icon.svg',
        text: 'Groups',
        isActive: this.isInstructor(),
      },
      {
        link: '/dashboard/instructor/students',
        image: '../../../../assets/images/sidebar-images/Students icon.svg',
        text: 'Students',
        isActive: this.isInstructor(),
      },
      {
        link: this.isInstructor()
          ? '/dashboard/instructor/results'
          : '/dashboard/student/student-results',
        image: '../../../../assets/images/sidebar-images/Results icon.svg',
        text: 'Results',
        isActive: this.isInstructor() || this.isStudent(),
      },
    ];
  }
}
