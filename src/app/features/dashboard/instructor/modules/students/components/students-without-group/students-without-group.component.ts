import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ISpecificStudent } from '../../interfaces/ispecific-student';
import { Istudent } from '../../interfaces/istudent';
import { StudentsService } from '../../services/students.service';
declare var bootstrap: any; // Import Bootstrap JS globally

@Component({
  selector: 'app-students-without-group',
  templateUrl: './students-without-group.component.html',
  styleUrl: './students-without-group.component.scss',
})
export class StudentsWithoutGroupComponent {
  collection: Istudent[] = [];
  page: number = 1;
  studentview: ISpecificStudent | undefined = {} as ISpecificStudent;

  constructor(
    private _StudentsService: StudentsService,
    private _ToastrService: ToastrService
  ) {}

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

  AddStudenttoGroup(idStudent: string, idGroup: string) {
    this._StudentsService.onAddStudentToGroup(idStudent, idGroup).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message);
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
