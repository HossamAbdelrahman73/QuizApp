import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from '../interfaces/istudent';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private _HttpClient: HttpClient) {}

  onGetStudentsInGroup(): Observable<any> {
    return this._HttpClient.get(`student`);
  }
  onGetStudentsWithoutGroup(): Observable<IStudent[]> {
    return this._HttpClient.get<IStudent[]>(`student/without-group`);
  }
  onGetStudentById(id: string): Observable<any> {
    return this._HttpClient.get(`student/${id}`);
  }
  onDeleteStudentFromGroup(
    idStudent: string,
    idGroup: string
  ): Observable<any> {
    return this._HttpClient.delete(`student/${idStudent}/${idGroup}`);
  }
  onAddStudentToGroup(idStudent: string, idGroup: string): Observable<any> {
    return this._HttpClient.get(`student/${idStudent}/${idGroup}`);
  }
  //   onUpdateStudentGroup(idStudent:string,idGroup:string):Observable<any>{
  //  return this._HttpClient.put(`/student/${idStudent}/${idGroup}`);
  // }

  onDeleteStudentById(id: string): Observable<any> {
    return this._HttpClient.delete(`student/${id}`);
  }

  getAllGroups(): Observable<any> {
    return this._HttpClient.get(`group`);
  }
}
