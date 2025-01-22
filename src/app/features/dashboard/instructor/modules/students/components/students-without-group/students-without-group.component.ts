import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IGroups } from '../../interfaces/igroups';
import { ISpecificStudent } from '../../interfaces/ispecific-student';
import { StudentsService } from '../../services/students.service';
declare var bootstrap: any; // Import Bootstrap JS globally

@Component({
  selector: 'app-students-without-group',
  templateUrl: './students-without-group.component.html',
  styleUrl: './students-without-group.component.scss',
})
export class StudentsWithoutGroupComponent {
  collection: ISpecificStudent[] = [];
  page: number = 1;
  studentview: ISpecificStudent | undefined = {} as ISpecificStudent;
  groups: IGroups[] = [];
  choosenGroup: string = '';
  IdStudent: string = '';

  constructor(
    private _StudentsService: StudentsService,
    private _ToastrService: ToastrService
  ) {}

  // chooseGroup(id: string) {
  //   this.choosenGroup = id;
  //   console.log(this.choosenGroup);
  // }

  ngOnInit(): void {
    this.getAllStudentswithoutGroup();
  }

  getAllStudentswithoutGroup() {
    this._StudentsService.onGetStudentsWithoutGroup().subscribe({
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

  AddStudentToGroup() {
    if (this.choosenGroup && this.IdStudent) {
      this._StudentsService
        .onAddStudentToGroup(this.IdStudent, this.choosenGroup)
        .subscribe({
          next: (res) => {
            console.log(res);
            this._ToastrService.success(res.message);
            this.getAllStudentswithoutGroup();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  openGroupsToAddStudent(idStudent: string) {
    this.IdStudent = idStudent;
    this._StudentsService.getAllGroups().subscribe({
      next: (res) => {
        console.log(res);
        this.groups = res;
        const modalElement = document.getElementById('AddStudentModal');
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

  deleteStudent(id: string) {
    this._StudentsService.onDeleteStudentById(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message);
        this.getAllStudentswithoutGroup();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
