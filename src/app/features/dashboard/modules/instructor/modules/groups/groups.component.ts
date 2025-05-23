import { Component, inject, OnInit } from '@angular/core';
import { GroupsService } from './services/groups.service';
import { IGroup, IGroupById, IStudentInGroup } from './interfaces/group.interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddEditGroupDialogComponent } from './components/add-edit-group-dialog/add-edit-group-dialog.component';
import { StudentsService } from '../students/services/students.service';
import { IStudent } from '../students/interfaces/istudent';
import { DeleteDialogComponent } from '../../../../../../shared/components/delete-dialog/delete-dialog.component';
import { pipe, take } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent implements OnInit {
  dialog = inject(MatDialog);
  studentsService = inject(StudentsService);
  groupsService = inject(GroupsService);
  toast = inject(ToastrService);
  groups: IGroup[] = [];
  students: IStudentInGroup[] = [];
  group: IGroupById;

  constructor() {
    this.group = {
      _id: '',
      name: '',
      status: '',
      instructor: '',
      students: [
        {
          _id: '',
          first_name: '',
          last_name: '',
          email: ''
        }
      ],
      max_students: 0
    };
  }

  ngOnInit(): void {
    this.getGroups();
    this.getStudentsWithoutGroup();
  }

  getGroups() {
    this.groupsService.getGroups().pipe(take(1)).subscribe({
      next: (groups: IGroup[]) => {
        this.groups = groups;
      },
      error: (err) => {
        this.toast.error(err.error.message);
      }
    })
  }
  getStudentsWithoutGroup() {
    this.studentsService.onGetStudentsWithoutGroup().pipe(take(1)).subscribe({
      next: (students: IStudent[]) => {
        this.students = students.map((student) => {
          return {
            _id: student._id,
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email
          }
        });
      },
      error: (err) => {
        this.toast.error(err.error.message);
      }
    })
  }

  onCreateGroup() {
    const dialogRef = this.dialog.open(AddEditGroupDialogComponent, {
      width: '500px',
      data: {
        title: 'Set up a new Group',
        students: this.students
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupsService.createGroup(result).pipe(take(1)).subscribe({
          error: (err) => {
            this.toast.error(err.error.message);
          },
          complete: () => {
            this.getGroups();
            this.toast.success('Group created successfully');
          }
        })
      }
    })
  }

  onEditGroup(group: IGroup) {
    this.getGroupById(group._id);
  }
  getGroupById(id: string) {
    this.groupsService.getGroupById(id).pipe(take(1)).subscribe({
      next: (group: IGroupById) => {
        this.group = group;
      },
      error: (err) => {
        this.toast.error(err.error.message);
      },
      complete: () => {
        this.students.push(...this.group.students);
        const dialogRef = this.dialog.open(AddEditGroupDialogComponent, {
          width: '500px',
          data: {
            title: 'Update group',
            group: this.group,
            students: this.students
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.getStudentsWithoutGroup();
          if (result) {
            this.groupsService.updateGroup(this.group._id, result).pipe(take(1)).subscribe({
              error: (err) => {
                this.toast.error(err.error.message);
              },
              complete: () => {
                this.getGroups();
                this.toast.success('Group updated successfully');
              }
            })
          }
        })
      }
    })
  }
  onDeleteGroup(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        title: 'group',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupsService.deleteGroup(id).subscribe({
          error: (err) => {
            this.toast.error(err.error.message);
          },
          complete: () => {
            this.getGroups();
            this.toast.success('Group deleted successfully');
          }
        })
      }
    })
  }
}
