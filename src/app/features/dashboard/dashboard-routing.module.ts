import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'instructor',
        loadChildren: () =>
          import('../../features/dashboard/instructor/instructor.module').then(
            (m) => m.InstructorModule
          ),
      },
      {
        path: 'student',
        loadChildren: () =>
          import('../../features/dashboard/student/student.module').then(
            (m) => m.StudentModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
