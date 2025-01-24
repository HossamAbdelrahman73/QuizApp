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
    this.isInstructor()
    this.isInstructor()
  }
}
