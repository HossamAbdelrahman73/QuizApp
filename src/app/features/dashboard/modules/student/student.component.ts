import { Component, inject, OnInit } from '@angular/core';
import { StudentResultsService } from './modules/student-results/services/student-results.service';
import { ICompletedQuiz, IQuiz } from '../instructor/modules/quizes/interfaces/iquiz';
import { QuizesService } from '../instructor/modules/quizes/services/quizes.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewItemComponent } from '../instructor/components/view-item/view-item.component';
import { ITableColumnConfig } from '../../../../shared/interfaces/table/table-column-config.interface';
import { JoinQuizComponent } from './components/join-quiz/join-quiz.component';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit{
  private _studentResultsService = inject(StudentResultsService)
  private _QuizesService = inject(QuizesService)
  dialog = inject(MatDialog);
  completedQuizzes : ICompletedQuiz[] = []
  quizList: IQuiz[] = [];
  quizDetails: IQuiz = {} as IQuiz;
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
    this.getCompletedQuizzes()
    this.getIncommingQuizzes()
  }
  getQuizById(id: string): void {
  this._QuizesService.onGetQuizById(id).subscribe({
      next: (res) => {
        this.quizDetails = res
        this.quizDetails = res;
      },error:(err)=> {
        console.log(err);

      }, complete: ()=> {
        this.dialog.open(ViewItemComponent, {
          data : {
            data: this.quizDetails,
            title: 'Quiz'
          },
        });
      }
    });
  }
 getCompletedQuizzes():void {
  this._studentResultsService.onGetLastCompletedQuizes().subscribe({
    next: (res)=> {
      this.completedQuizzes = res
    }, error: (err)=> {
      console.log(err);
    }
  })
 }
 getIncommingQuizzes():void {
 this._studentResultsService.onGetFiveIncomingQuiz().subscribe({
  next: (res)=> {
    this.quizList = res
  }, error: (err)=> {
    console.log(err);
  }
 })
}
joinQuiz():void {
  const dialogRef =  this.dialog.open(JoinQuizComponent);
}
}
