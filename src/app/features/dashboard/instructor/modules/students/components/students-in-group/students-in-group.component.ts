import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ISpecificStudent } from '../../interfaces/ispecific-student';
import { IStudent } from '../../interfaces/istudent';
import { StudentsService } from './../../services/students.service';
import { IGroups } from '../../interfaces/igroups';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../../../../../shared/components/delete-dialog/delete-dialog.component';

declare var bootstrap: any; // Import Bootstrap JS globally

@Component({
  selector: 'app-students-in-group',
  templateUrl: './students-in-group.component.html',
  styleUrl: './students-in-group.component.scss',
})
export class StudentsInGroupComponent implements OnInit {
  collection: IStudent[] = [];
  page: number = 1;
  itemsPerPage: number = 5;
  studentview: ISpecificStudent | undefined = {} as ISpecificStudent;
  groups: IGroups[] = [];
  choosenGroup: string = '';
  IdStudent: string = '';

  constructor(
    private _StudentsService: StudentsService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllStudentsInGroup();
  }

  getIdGroupValue(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.choosenGroup = selectElement.value; // Get the selected value
    console.log('choosenGroup: ', this.choosenGroup);
  }

  getAllStudentsInGroup() {
    this._StudentsService
      .onGetStudentsInGroup()
      .pipe(
        map((students: IStudent[]) =>
          students.filter((student) => student.group)
        )
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.collection = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  flagView: boolean = false;
  viewStudent(id: string) {
    this._StudentsService.onGetStudentById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.studentview = res;
        this.flagView = true;

        const modalElement = document.getElementById('viewStudentModal');
        if (modalElement) {
          const modalInstance = new bootstrap.Modal(modalElement);
          modalInstance.show();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateStudentGroup() {
    if (this.choosenGroup !== 'none') {
      this._StudentsService
        .onUpdateStudentGroup(this.IdStudent, this.choosenGroup)
        .subscribe({
          next: (res) => {
            console.log(res);
            this._ToastrService.success(res.message);
            this.choosenGroup = '';
            this.IdStudent = '';
            console.log(this.choosenGroup, this.IdStudent);
            this.getAllStudentsInGroup();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
  dialog = inject(MatDialog);

  deleteStudent(id: string, student: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        title: `${student}`,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this._StudentsService.onDeleteStudentById(id).subscribe({
          next: (res) => {
            console.log(res);
            this._ToastrService.success(res.message);
            this.getAllStudentsInGroup();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
