import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateQuestion, IGetQuestion } from '../interfaces/question.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionBankService {
  _http = inject(HttpClient);
  constructor() {}
  createQuestion(question: ICreateQuestion) {
    return this._http.post('question', question);
  }

  onGetQuestions(): Observable<IGetQuestion[]> {
    return this._http.get<IGetQuestion[]>(`question`);
  }

  updateQuestion(question: ICreateQuestion, id: string) {
    return this._http.put(`question/${id}`, question);
  }

  deleteQuestion(id: string) {
    return this._http.delete(`question/${id}`);
  }
}
