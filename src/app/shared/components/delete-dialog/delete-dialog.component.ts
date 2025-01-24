import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddEditGroupDialogComponent } from '../../../features/dashboard/modules/instructor/modules/groups/components/add-edit-group-dialog/add-edit-group-dialog.component';
import { IStudentInGroup } from '../../../features/dashboard/modules/instructor/modules/groups/interfaces/group.interface';
import { StudentsService } from '../../../features/dashboard/modules/instructor/modules/students/services/students.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
  toast = inject(ToastrService);
  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  constructor() {

  }
  ngOnInit(): void {

  }
}
