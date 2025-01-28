import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { JoinQuizService } from '../../services/service-join-quiz/join-quiz.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { QuizJoinedComponent } from '../quiz-joined/quiz-joined.component';

@Component({
  selector: 'app-join-quiz',
  templateUrl: './join-quiz.component.html',
  styleUrl: './join-quiz.component.scss',
})
export class JoinQuizComponent {
  public dialogRef = inject(MatDialogRef<JoinQuizComponent>);
  private _joinQuizService = inject(JoinQuizService);
  private _formBuilder = inject(FormBuilder);
  private _toastrService = inject(ToastrService);
  private _router = inject(Router);
  dialog = inject(MatDialog);
  _id: string = '';
  joinQuizForm: FormGroup = this._formBuilder.group({
    code: ['', [Validators.required]],
  });
  joinQuiz(data: FormGroup): void {
    this._joinQuizService.onJoinQuiz(data.value).subscribe({
      next: (res) => {
        console.log(res);
        this._id = res.data.quiz;
        this._toastrService.success('You have joined quiz Successfully');
      },
      error: (err) => {
        this._toastrService.error(err.error.message);
        this.dialogRef.close();
      },
      complete: () => {
        this.dialogRef.close();
        this.dialog.open(QuizJoinedComponent)
        this._router.navigate([`dashboard/student/start-quiz/${this._id}`]);
      },
    });
  }
}
