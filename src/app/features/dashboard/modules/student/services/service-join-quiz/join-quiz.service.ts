import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnswers } from '../../interfaces/ianswers';

@Injectable({
  providedIn: 'root'
})
export class JoinQuizService {

 private _httpClient = inject(HttpClient)
 onJoinQuiz(code: string): Observable<any> {
  return this._httpClient.post("quiz/join", code )
 }
 onGetQuizQuestions(id:string):Observable<any> {
  return this._httpClient.get(`quiz/without-answers/${id}`)
 }
 onSubmitQuizAnswers (id: string, answers: IAnswers) : Observable<any> {
  return this._httpClient.post(`quiz/submit/${id}`, {answers: answers})
 }
}
