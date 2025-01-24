import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddEditGroupDialogComponent } from '../../../../../groups/components/add-edit-group-dialog/add-edit-group-dialog.component';

@Component({
  selector: 'app-add-view-edit-question-dialog',
  templateUrl: './add-view-edit-question-dialog.component.html',
  styleUrl: './add-view-edit-question-dialog.component.scss'
})
export class AddViewEditQuestionDialogComponent {
  toast = inject(ToastrService);
  readonly dialogRef = inject(MatDialogRef<AddEditGroupDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl([], Validators.required),
      options: new FormGroup({
        A: new FormControl('', Validators.required),
        B: new FormControl('', Validators.required),
        C: new FormControl('', Validators.required),
        D: new FormControl('', Validators.required),
      }),
      answer: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      difficulty: new FormControl('', Validators.required),
    })

  }
  ngOnInit(): void {

  }
}
