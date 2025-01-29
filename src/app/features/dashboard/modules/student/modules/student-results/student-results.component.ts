import { Component, inject, OnInit } from '@angular/core';
import { StudentResultsService } from './services/student-results.service';
import { ITableColumnConfig } from '../../../../../../shared/interfaces/table/table-column-config.interface';
import { IQuiz } from '../../../instructor/modules/quizes/interfaces/iquiz';

@Component({
  selector: 'app-student-results',
  templateUrl: './student-results.component.html',
  styleUrl: './student-results.component.scss',
})
export class StudentResultsComponent implements OnInit {
  private _studentResultsService = inject(StudentResultsService);
  tableColumns: ITableColumnConfig[] = [
    { key: 'title', label: 'Title' },
    { key: 'duration', label: 'Duration' },
    { key: 'difficulty', label: 'Difficulty' },
    { key: 'type', label: 'Type' },
    { key: 'schadule', label: 'Date', pipe: { type: 'date', format: 'dd / MM / yyyy' } },
  ]
  quizDetails: IQuiz[] = []
  ngOnInit(): void {
    this.getAllResults()
  }
  getAllResults(): void {
    this._studentResultsService.onGetAllResults().subscribe({
      next: (res) => {
        console.log(res);
        this.quizDetails = res.map((quiz: any) => {
          return quiz.quiz
        })
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
