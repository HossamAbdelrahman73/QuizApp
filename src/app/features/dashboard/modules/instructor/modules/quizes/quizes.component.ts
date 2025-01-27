import { ToastrService } from 'ngx-toastr';
import { QuizesService } from './services/quizes.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { GroupsService } from '../groups/services/groups.service';
import { IGroup } from '../groups/interfaces/group.interface';
import { DatePipe } from '@angular/common';
import { quizRoutes } from './routes/quiz-routes';
import { ITableColumnConfig } from '../../../../../../shared/interfaces/table/table-column-config.interface';
import { DashboardService } from '../../../../services/dashboard.service';
import { take } from 'rxjs';
import { ICompletedQuiz, IQuiz } from './interfaces/iquiz';
import { MatDialog } from '@angular/material/dialog';
import { ViewItemComponent } from '../../components/view-item/view-item.component';
declare var bootstrap: any; // Import Bootstrap JS globally

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrl: './quizes.component.scss',
})
export class QuizesComponent implements OnInit {
  dialog = inject(MatDialog);
  quizesService = inject(QuizesService);
  quizRoutes = quizRoutes;
  selectedDate: string = '';
  selectedTiem: string = '';
  completedQuizes: ICompletedQuiz[] = [];
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
  quizForm = this._FormBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    group: ['', [Validators.required]],
    questions_number: [0, [Validators.required]],
    difficulty: ['', [Validators.required]],
    type: ['', [Validators.required]],
    schadule: [null, [Validators.required]],
    duration: ['', [Validators.required]],
    score_per_question: ['', [Validators.required]],
  });
  groups: IGroup[] = [];
  quizList: IQuiz[] = [];
  duration: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  questionsNumbur: number[] = Array.from({ length: 50 }, (_, i) => i + 1);
  questionScore: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  quizDetails: IQuiz = {} as IQuiz;
  constructor(
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService,
    private _DashboardService: DashboardService,
    private _QuizesService : QuizesService
  ) { }

  ngOnInit(): void {
    this.getCompletedQuizes();
    this.getAllQuizzes();
    this.getFiveIncomingQuiz();
  }

  getAllQuizzes(): void {
    this.quizesService
      .onGetAllQuizzes()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.quizList = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  getFiveIncomingQuiz(): void {
    this._DashboardService
      .onGetFiveIncomingQuiz()
      .pipe(take(1))
      .subscribe({
        error: (err) => {
          this._ToastrService.error(err.message);
        },
      });
  }

  getCompletedQuizes() {
    this.quizesService
      .getLastFiveQuizes()
      .pipe(take(1))
      .subscribe({
        next: (quizes: ICompletedQuiz[]) => {
          this.completedQuizes = quizes;
        },
        error: (err) => {
          this._ToastrService.error(err.message);
        },
      });
  }
  getQuizById(id: string): void {
    this._QuizesService.onGetQuizById(id).subscribe({
      next: (res) => {
        this.quizDetails = res
        console.log(this.quizDetails);
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
}
