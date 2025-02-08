import { studentRoutes } from './../../routes/student-routes';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITableColumnConfig } from '../../../../../../shared/interfaces/table/table-column-config.interface';
import { ViewItemComponent } from '../../../instructor/components/view-item/view-item.component';
import {
  ICompletedQuiz,
  IQuiz,
} from '../../../instructor/modules/quizes/interfaces/iquiz';
import { QuizesService } from '../../../instructor/modules/quizes/services/quizes.service';
import { JoinQuizComponent } from '../../components/join-quiz/join-quiz.component';
import { StudentResultsService } from '../student-results/services/student-results.service';
import { quizRoutes } from '../../../instructor/modules/quizes/routes/quiz-routes';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrl: './quizes.component.scss',
})
export class QuizesComponent implements OnInit {
  studentRoutes = studentRoutes;
  private _studentResultsService = inject(StudentResultsService);
  private _QuizesService = inject(QuizesService);
  dialog = inject(MatDialog);
  completedQuizzes: ICompletedQuiz[] = [];
  quizList: IQuiz[] = [];
  quizDetails: IQuiz = {} as IQuiz;
  quizRoutes = quizRoutes;
  completedQuizesColumns: ITableColumnConfig[] = [
    { key: 'title', label: 'Title' },
    { key: 'questions_number', label: 'Question number' },
    { key: 'difficulty', label: 'Difficulty' },
    {
      key: 'schadule',
      label: 'Schedule',
      pipe: { type: 'date', format: 'dd/MM/yyyy' },
    },
    { key: 'type', label: 'Type' },
  ];
  ngOnInit(): void {
    this.getCompletedQuizzes();
    this.getIncommingQuizzes();
  }
  getQuizById(id: string): void {
    this._QuizesService.onGetQuizById(id).subscribe({
      next: (res) => {
        this.quizDetails = res;
        this.quizDetails = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.dialog.open(ViewItemComponent, {
          data: {
            data: this.quizDetails,
            title: 'Quiz',
          },
        });
      },
    });
  }
  getCompletedQuizzes(): void {
    this._studentResultsService.onGetLastCompletedQuizes().subscribe({
      next: (res) => {
        this.completedQuizzes = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getIncommingQuizzes(): void {
    this._studentResultsService.onGetFiveIncomingQuiz().subscribe({
      next: (res) => {
        this.quizList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  joinQuiz(): void {
    const dialogRef = this.dialog.open(JoinQuizComponent);
  }
}
