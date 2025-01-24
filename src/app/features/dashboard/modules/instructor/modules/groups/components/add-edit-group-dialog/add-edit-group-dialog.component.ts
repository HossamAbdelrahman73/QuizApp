import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentsService } from '../../../students/services/students.service';
import { ToastrService } from 'ngx-toastr';
import { IStudentInGroup } from '../../interfaces/group.interface';

@Component({
  selector: 'app-add-edit-group-dialog',
  templateUrl: './add-edit-group-dialog.component.html',
  styleUrl: './add-edit-group-dialog.component.scss'
})
export class AddEditGroupDialogComponent implements OnInit {
  studentsService = inject(StudentsService);
  toast = inject(ToastrService);
  readonly dialogRef = inject(MatDialogRef<AddEditGroupDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      students: new FormControl([], Validators.required)
    })
    if (this.data.group) {
      this.form.patchValue({
        name: this.data.group.name,
        students: this.data.group.students.map((student: IStudentInGroup) => student._id)
      });
    }
  }
  ngOnInit(): void {

  }
}
