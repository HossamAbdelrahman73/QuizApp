import { Iquiz, IResultInstructor } from './interfaces/iresult-instructor';
import { Component, inject, OnInit } from '@angular/core';
import { ResultsInstructorService } from './services/results-instructor.service';
import { ITableColumnConfig } from '../../../../../../shared/interfaces/table/table-column-config.interface';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {
  private _resultsInstructorService = inject(ResultsInstructorService)
  tableColumns: ITableColumnConfig[] = [
    { key: 'title', label: 'Title' },
    { key: 'duration', label: 'Duration' },
    { key: 'difficulty', label: 'Difficulty' },
    { key: 'type', label: 'Type' },
    { key: 'schadule', label: 'Date', pipe: {type: 'date', format: 'dd / MM / yyyy'} },
  ]
  resultsList: IResultInstructor[] = []
  quizDetails: Iquiz[] = []
  ngOnInit(): void {
    this.getAllResults()
  }
  getAllResults(): void {
    this._resultsInstructorService.onGetAllResults().subscribe({
      next: (res) => {
        this.quizDetails = res.map((quiz: any) => {
          return quiz.quiz
        })
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
