import { Component, OnInit } from '@angular/core';
import { QuizesService } from '../../services/quizes.service';
import { IQuiz } from '../../interfaces/iquiz';
import { ITableColumnConfig } from '../../../../../../../../shared/interfaces/table/table-column-config.interface';
import { Route, Router } from '@angular/router';
import { quizRoutes } from '../../routes/quiz-routes';
import { IBreadcrumb } from '../../../../../../../../shared/interfaces/breadcrumb/ibreadcrumb';
@Component({
  selector: 'app-all-quizes',
  templateUrl: './all-quizes.component.html',
  styleUrl: './all-quizes.component.scss',
})
export class AllQuizesComponent implements OnInit {
  navigationList: IBreadcrumb[] = [
    { label: 'Quizzes', url: '/dashboard/instructor/quizzes' },
    { label: 'All Quizzes', url: '/dashboard/instructor/quizzes/view-all-quizes' },
    { label: 'View Quiz' }
  ]
  btnText: string = 'All quizzes';
  btnIcon: string = "";
  quizes: IQuiz[] = [];
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
    {
      key: 'actions',
      label: 'Actions',
      isAction: true,
      actions: [
        {
          label: 'view',
          icon: 'visibility',
          color: 'orange-color',
          action: (quiz: IQuiz) =>
            this._Router.navigate([quizRoutes.VIEW_QUIZ, quiz._id]),
        },
      ],
    },
  ];
  constructor(private _QuizesService: QuizesService, private _Router: Router) {}
  ngOnInit(): void {
    this.getAllquizes();
  }

  viewQuiz() {
    // console.log('view quiz');
  }
  getAllquizes() {
    this._QuizesService.onGetAllQuizzes().subscribe({
      next: (res) => {
        this.quizes = res;
      },
      error: (err) => {
      },
    });
  }
}
