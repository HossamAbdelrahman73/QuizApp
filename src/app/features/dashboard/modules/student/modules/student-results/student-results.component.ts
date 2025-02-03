import { Component, inject, OnInit } from '@angular/core';
import { StudentResultsService } from './services/student-results.service';
import { ITableColumnConfig } from '../../../../../../shared/interfaces/table/table-column-config.interface';
import { IQuiz } from '../../../instructor/modules/quizes/interfaces/iquiz';
import { IQuizResult, IResult, ITableResult } from './interfaces/result.interface';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-student-results',
  templateUrl: './student-results.component.html',
  styleUrl: './student-results.component.scss',
})
export class StudentResultsComponent implements OnInit {
  private resultsSubject = new BehaviorSubject<ITableResult[]>([]);
  results$ = this.resultsSubject.asObservable();
  private _studentResultsService = inject(StudentResultsService);
  tableColumns: ITableColumnConfig[] = [
    { key: 'quiz', label: 'Quiz title' },
    { key: 'participant', label: 'Participant' },
    { key: 'score', label: 'Score' },
    { key: 'started_at', label: 'Date', pipe: { type: 'date', format: 'dd / MM / yyyy' } },
  ]
  quizDetails: IQuiz[] = []
  resultList: ITableResult[] = []
  ngOnInit(): void {
    this.getAllResults()
  }
  getAllResults(): void {
    this._studentResultsService.onGetAllResults().pipe(map(result => {
      return this.resultList = result.map((result: IQuizResult) => this.handleResultsData(result.result))
    }),
      tap((result) => this.resultsSubject.next(result))).subscribe();
  }
  handleResultsData(result: IResult): ITableResult {
    return {
      quiz: result.quiz.title,
      participant: result.participant.first_name + ' ' + result.participant.last_name,
      score: result.score,
      started_at: result.started_at
    }
  }
}
