import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { ViewQuizComponent } from './modules/quizes/components/view-quiz/view-quiz.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: InstructorComponent },
  {
    path: 'students',
    loadChildren: () =>
      import('./modules/students/students.module').then(
        (m) => m.StudentsModule
      ),
  },
  {
    path: 'groups',
    loadChildren: () =>
      import('../instructor/modules/groups/groups.module').then(
        (m) => m.GroupsModule
      ),
  },
  {
    path: 'quizzes',
    loadChildren: () =>
      import('./modules/quizes/quizes.module').then((m) => m.QuizesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
