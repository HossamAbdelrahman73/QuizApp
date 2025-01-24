import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { IGroups } from '../../interfaces/igroups';
import { ISpecificStudent } from '../../interfaces/ispecific-student';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../../../../../../shared/components/delete-dialog/delete-dialog.component';
declare var bootstrap: any; // Import Bootstrap JS globally

export interface IchoosenStudents {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}

@Component({
  selector: 'app-students-in-choosen-group',
  templateUrl: './students-in-choosen-group.component.html',
  styleUrl: './students-in-choosen-group.component.scss',
})
export class StudentsInChoosenGroupComponent {
  id: string = '';
  collection: IchoosenStudents[] = [];
  page: number = 1;
  studentview: ISpecificStudent | undefined = {} as ISpecificStudent;
  groups: IGroups[] = [];
  choosenGroup: string = '';
  IdStudent: string = '';
  groupName: string = '';
  IdGroup: string = '';

  constructor(
    private route: ActivatedRoute,
    private _StudentsService: StudentsService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      console.log('ID:', this.id);
      this.getStudentsInChoosenGroup(this.id);
    });
  }

  getStudentsInChoosenGroup(id: string) {
    this._StudentsService.GetGroupById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.collection = res.students;
        this.groupName = res.name;
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
    this._StudentsService
      .onUpdateStudentGroup(this.IdStudent, this.choosenGroup)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._ToastrService.success(res.message);
          this.choosenGroup = '';
          this.IdStudent = '';
          console.log(this.choosenGroup, this.IdStudent);
          this.getStudentsInChoosenGroup(this.id);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  openGroupsToUpdateStudentGroup(idStudent: string) {
    this.IdStudent = idStudent;
    this._StudentsService.getAllGroups().subscribe({
      next: (res) => {
        console.log(res);
        this.groups = res;
        const modalElement = document.getElementById('updateStudentModal');
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

  getGroupId(idGroup: string) {
    this.IdGroup = idGroup;
  }

  getIdGroupValue(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.choosenGroup = selectElement.value; // Get the selected value
    console.log('choosenGroup: ', this.choosenGroup);
  }

  dialog = inject(MatDialog);
  deleteStudentFromGroup(idStudent: string, idGroup: string, student: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        title: `${student}`,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this._StudentsService
          .onDeleteStudentFromGroup(idStudent, idGroup)
          .subscribe({
            next: (res) => {
              console.log(res);
              this._ToastrService.success(res.message);
              this.getStudentsInChoosenGroup(this.id);
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }

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
            this.getStudentsInChoosenGroup(this.id);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
