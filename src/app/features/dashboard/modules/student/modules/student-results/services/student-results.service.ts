import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompletedQuiz } from '../../../../instructor/modules/quizes/interfaces/iquiz';

@Injectable({
  providedIn: 'root'
})
export class StudentResultsService {

  private _HttpClient = inject(HttpClient);
  onGetFiveIncomingQuiz(): Observable<any> {
    return this._HttpClient.get('quiz/incomming');
  }
  getLastCompletedQuizes(): Observable<ICompletedQuiz[]> {
    return this._HttpClient.get<ICompletedQuiz[]>('quiz/completed');
  }
}
