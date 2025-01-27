import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuiz } from '../interfaces/iquiz';

@Injectable({
  providedIn: 'root',
})
export class QuizesService {
  constructor(private _HttpClient: HttpClient) {}

  onCreateQuiz(data: any): Observable<any> {
    return this._HttpClient.post(`quiz`, data);
  }

  onGetQuizById(id: string): Observable<any> {
    return this._HttpClient.get(`quiz/${id}`);
  }
  onUpdateQuizById(id: string, data: any): Observable<any> {
    return this._HttpClient.put(`quiz/${id}`, data);
  }
  onGetAllQuizzes(): Observable<IQuiz[]> {
    return this._HttpClient.get<IQuiz[]>(`quiz`);
  }
  getLastFiveQuizes() {
    return this._HttpClient.get('quiz/completed');
  }
  deleteQuiz (id: string) {
    return this._HttpClient.delete(`quiz/${id}`);
  }
}
