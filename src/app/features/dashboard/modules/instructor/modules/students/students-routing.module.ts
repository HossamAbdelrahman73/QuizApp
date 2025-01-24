import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentsInGroupComponent } from './components/students-in-group/students-in-group.component';
import { StudentsWithoutGroupComponent } from './components/students-without-group/students-without-group.component';
import { StudentsInChoosenGroupComponent } from './components/students-in-choosen-group/students-in-choosen-group.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    children: [
      { path: '', redirectTo: 'students-in-group', pathMatch: 'full' },
      { path: 'students-in-group', component: StudentsInGroupComponent },
      {
        path: 'students-without-group',
        component: StudentsWithoutGroupComponent,
      },
      {
        path: 'students-in-choosen-group/:id',
        component: StudentsInChoosenGroupComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
