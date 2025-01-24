import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { AddEditGroupDialogComponent } from './components/add-edit-group-dialog/add-edit-group-dialog.component';


@NgModule({
  declarations: [
    GroupsComponent,
    AddEditGroupDialogComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    SharedModule
  ]
})
export class GroupsModule { }
