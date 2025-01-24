import { Component, computed, inject, Signal } from '@angular/core';
import { SharedService } from '../../shared/services/shared-service/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  _SharedService = inject(SharedService)
  valueSideBarChanged:Signal<boolean> = computed(()=> this._SharedService.sideBarChanged())
  public currentTime = new Date();

  constructor() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
}
