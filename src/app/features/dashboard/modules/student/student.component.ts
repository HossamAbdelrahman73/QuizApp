import { Component, inject } from '@angular/core';
import { StudentResultsService } from './modules/student-results/services/student-results.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  private _studentResultsService = inject(StudentResultsService)
 getCompletedQuizzes():void {
 }
}
