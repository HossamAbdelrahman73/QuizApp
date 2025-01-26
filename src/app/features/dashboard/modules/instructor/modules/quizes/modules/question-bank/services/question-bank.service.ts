import { inject, Injectable } from '@angular/core';
import { ICreateQuestion } from '../interfaces/create-question.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionBankService {
  _http = inject(HttpClient);
  constructor() {}
  createQuestion(question: ICreateQuestion) {
    return this._http.post('question', question);
  }

  onGetQuestions(): Observable<any> {
    return this._http.get(`question`);
  }
}
