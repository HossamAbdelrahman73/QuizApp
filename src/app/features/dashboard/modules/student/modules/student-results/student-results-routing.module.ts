import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentResultsComponent } from './student-results.component';

const routes: Routes = [{ path: '', component: StudentResultsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentResultsRoutingModule { }
