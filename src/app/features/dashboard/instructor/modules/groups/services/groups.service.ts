import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGroup, IGroupById } from '../interfaces/group.interface';
import { ICreateGroup } from '../interfaces/create-group.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  _http = inject(HttpClient);
  constructor() { }
  getGroups(): Observable<IGroup[]> {
    return this._http.get<IGroup[]>('group')
  }
  getGroupById(id: string): Observable<IGroupById> {
    return this._http.get<IGroupById>(`group/${id}`)
  }
  createGroup(data: ICreateGroup) {
    return this._http.post('group', data)
  }
  updateGroup(id: string, data: ICreateGroup) {
    return this._http.put(`group/${id}`, data)
  }
}
