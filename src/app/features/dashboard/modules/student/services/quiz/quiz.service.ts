import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJoinQuizRes } from '../../interfaces/join-quiz-res.interface';
import { IQuestionsWithoutAnswers } from '../../interfaces/questions-without-answers.interface';
import { IAnswer } from '../../interfaces/answer.interface';
import { ISubmitQuizRes } from '../../interfaces/submit-quiz-res.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private _httpClient = inject(HttpClient)
  onJoinQuiz(code: string): Observable<IJoinQuizRes> {
    return this._httpClient.post<IJoinQuizRes>("quiz/join", code)
  }
  onGetQuestionsWithoutAnswers(quizId: string): Observable<IQuestionsWithoutAnswers> {
    return this._httpClient.get<IQuestionsWithoutAnswers>(`quiz/without-answers/${quizId}`)
  }
  onSubmitQuiz(quizId: string, answers: IAnswer[]): Observable<ISubmitQuizRes> {
    return this._httpClient.post<ISubmitQuizRes>(`quiz/submit/${quizId}`, {answers})
  }
}
