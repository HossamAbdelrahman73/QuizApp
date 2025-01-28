import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateQuestion, IGetQuestion } from '../interfaces/question.interface';
import { IParams } from '../interfaces/iparams';
import { FormGroup } from '@angular/forms';

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
  onDeleteQustion(id:string) : Observable<any> {
    return this._http.delete(`question/${id}`)
  }
  onSearchQuestion(params : IParams):Observable<any> {
    return this._http.post(`question/search?difficulty=${params.difficulty}&type=${params.type}`, params )
  }
}
