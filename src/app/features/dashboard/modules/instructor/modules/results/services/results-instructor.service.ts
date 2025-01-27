import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsInstructorService {
private _HttpClient = inject(HttpClient)
onGetAllResults():Observable<any> {
  return this._HttpClient.get('quiz/result')
}
}
