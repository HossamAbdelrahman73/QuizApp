import { Iquiz, IResultInstructor } from './interfaces/iresult-instructor';
import { Component, inject, OnInit } from '@angular/core';
import { ResultsInstructorService } from './services/results-instructor.service';
import { ITableColumnConfig } from '../../../../../../shared/interfaces/table/table-column-config.interface';
import { IQuiz } from '../quizes/interfaces/iquiz';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit{
private _resultsInstructorService = inject(ResultsInstructorService)
tableColumns :ITableColumnConfig[] = [
  { key: 'quiz.title', label: 'Student name' },
  { key: 'difficulty', label: 'Score' },
  { key: 'participants', label: 'Average' },
  { key: 'type', label: 'Time submitted' },
]
resultsList :IResultInstructor[]= []
quizDetails : Iquiz[] =[]
ngOnInit(): void {
 this.getAllResults()
}
getAllResults(): void{
this._resultsInstructorService.onGetAllResults().subscribe({
  next:(res)=> {
    console.log(res);
    this.resultsList = res
    this.quizDetails = res.quiz
  }, error:(err)=> {
    console.log(err);
  }
})
}
}
