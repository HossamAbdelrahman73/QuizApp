import { Component, OnInit } from '@angular/core';
import { QuizesService } from '../../services/quizes.service';
import { IQuiz } from '../../interfaces/iquiz';
import { ITableColumnConfig } from '../../../../../../../../shared/interfaces/table/table-column-config.interface';

@Component({
  selector: 'app-all-quizes',
  templateUrl: './all-quizes.component.html',
  styleUrl: './all-quizes.component.scss',
})
export class AllQuizesComponent implements OnInit {
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
      actions: [
        {
          label: 'view',
          icon: '<i class="fa-solid fa-eye"></i>',
          color: '#FB7C19',
          action: () => this.viewQuiz(),
        },
      ],
    },
  ];
  constructor(private _QuizesService: QuizesService) {}

  ngOnInit(): void {
    this.getAllquizes();
  }

  viewQuiz() {
    console.log('view quiz');
  }

  getAllquizes() {
    this._QuizesService.onGetAllQuizzes().subscribe({
      next: (res) => {
        console.log(res);
        this.quizes = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
