import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IGroups } from '../../interfaces/igroups';
import { ISpecificStudent } from '../../interfaces/ispecific-student';
import { StudentsService } from '../../services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../../../../../../shared/components/delete-dialog/delete-dialog.component';
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

  getIdGroupValue(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.choosenGroup = selectElement.value; // Get the selected value
    console.log('choosenGroup: ', this.choosenGroup);
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
  dialog = inject(MatDialog);

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
            this.getAllStudentswithoutGroup();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
