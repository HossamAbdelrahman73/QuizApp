import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private _HttpClient: HttpClient) {}

  onGetStudentsInGroup(): Observable<any> {
    return this._HttpClient.get(`api/student`);
  }
  onGetStudentsWithoutGroup(): Observable<any> {
    return this._HttpClient.get(`api/student/without-group`);
  }
  onGetStudentById(id: string): Observable<any> {
    return this._HttpClient.get(`api/student/${id}`);
  }
  onDeleteStudentFromGroup(
    idStudent: string,
    idGroup: string
  ): Observable<any> {
    return this._HttpClient.delete(`api/student/${idStudent}/${idGroup}`);
  }
  onAddStudentToGroup(idStudent: string, idGroup: string): Observable<any> {
    return this._HttpClient.get(`api/student/${idStudent}/${idGroup}`);
  }

  onUpdateStudentGroup(idStudent: string, idGroup: string): Observable<any> {
    return this._HttpClient.put(`api/student/${idStudent}/${idGroup}`, null);
  }

  onDeleteStudentById(id: string): Observable<any> {
    return this._HttpClient.delete(`api/student/${id}`);
  }

  getAllGroups(): Observable<any> {
    return this._HttpClient.get(`api/group`);
  }

  GetGroupById(id: string): Observable<any> {
    return this._HttpClient.get(`api/group/${id}`);
  }
}
