import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _HttpClient = inject(HttpClient);
  onGetTopFiveStudents(): Observable<any> {
    return this._HttpClient.get<any>('student/top-five');
  }
  onGetFiveIncomingQuiz(): Observable<any> {
    return this._HttpClient.get<any>('quiz/incomming');
  }
  onGetStudentById(id: string): Observable<any> {
    return this._HttpClient.get(`student/${id}`);
  }
}
