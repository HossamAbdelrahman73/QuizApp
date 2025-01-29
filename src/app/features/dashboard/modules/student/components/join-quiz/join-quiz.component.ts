import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { studentRoutes } from '../../routes/student-routes';
import { QuizService } from '../../services/quiz/quiz.service';
import { IJoinQuizRes } from '../../interfaces/join-quiz-res.interface';

@Component({
  selector: 'app-join-quiz',
  templateUrl: './join-quiz.component.html',
  styleUrl: './join-quiz.component.scss'
})
export class JoinQuizComponent {
  public dialogRef = inject(MatDialogRef<JoinQuizComponent>)
  private _joinQuizService = inject(QuizService)
  private _formBuilder = inject(FormBuilder);
  private _toastrService = inject(ToastrService)
  private _router = inject(Router)
  joinQuizResponse: IJoinQuizRes | null = null;
  joinQuizForm: FormGroup = this._formBuilder.group(
    {
      code: ['', [Validators.required]],
    }
  );
  joinQuiz(data: FormGroup): void {
    this._joinQuizService.onJoinQuiz(data.value).subscribe({
      next: (res: IJoinQuizRes) => {
        this.joinQuizResponse = res
      }, error: (err) => {
        this._toastrService.error(err.error.message)
        this.dialogRef.close();
      }, complete: () => {
        this.dialogRef.close();
        this._toastrService.success(this.joinQuizResponse?.message);
        this._router.navigate([studentRoutes.QUIZ, this.joinQuizResponse?.data.quiz])
      }
    })
  }

}
