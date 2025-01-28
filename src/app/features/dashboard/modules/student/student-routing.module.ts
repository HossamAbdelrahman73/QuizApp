import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { QuizJoinedComponent } from './components/quiz-joined/quiz-joined.component';
import { StartQuizComponent } from './components/start-quiz/start-quiz.component';

const routes: Routes = [{ path: '', redirectTo: 'quizzes', pathMatch: 'full' },
{ path: 'quizzes', component: StudentComponent },
{ path: 'results', loadChildren: () => import('./modules/student-results/student-results.module').then(m => m.StudentResultsModule) },
{path: 'start-quiz/:quizID', component: StartQuizComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
