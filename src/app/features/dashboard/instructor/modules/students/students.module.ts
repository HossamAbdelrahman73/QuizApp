import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsInGroupComponent } from './components/students-in-group/students-in-group.component';
import { StudentsWithoutGroupComponent } from './components/students-without-group/students-without-group.component';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsInGroupComponent,
    StudentsWithoutGroupComponent,
  ],
  imports: [CommonModule, StudentsRoutingModule, SharedModule],
})
export class StudentsModule {}
