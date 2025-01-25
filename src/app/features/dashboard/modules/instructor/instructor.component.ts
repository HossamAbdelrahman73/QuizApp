import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../../../shared/services/shared-service/shared.service';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { IStudent } from './modules/quizes/interfaces/istudent';
import { IQuiz } from './modules/quizes/interfaces/iquiz';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.scss',
})
export class InstructorComponent implements OnInit, OnDestroy {
  private _DashboardService = inject(DashboardService);
  studentsSub!: Subscription;
  quizSub!: Subscription;
  studentList: IStudent[] = [];
  quizList: IQuiz[] = [];
  ngOnInit(): void {
    this.getFiveIncomingQuiz();
    this.getTopFiveStudents();
  }
  getTopFiveStudents(): void {
    this.studentsSub = this._DashboardService.onGetTopFiveStudents().subscribe({
      next: (res) => {
        this.studentList = res;
        // console.log(this.studentList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getFiveIncomingQuiz(): void {
    this.quizSub = this._DashboardService.onGetFiveIncomingQuiz().subscribe({
      next: (res) => {
        this.quizList = res
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.studentsSub.unsubscribe();
    this.quizSub.unsubscribe();
  }
}
