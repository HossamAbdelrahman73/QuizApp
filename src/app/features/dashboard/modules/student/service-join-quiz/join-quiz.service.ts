import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JoinQuizService {

 private _httpClient = inject(HttpClient)
 onJoinQuiz(code: string): Observable<any> {
  return this._httpClient.post("quiz/join", code )
 }
}
