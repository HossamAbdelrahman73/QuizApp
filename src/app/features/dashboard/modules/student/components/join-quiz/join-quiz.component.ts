import { Component, inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JoinQuizService } from '../../service-join-quiz/join-quiz.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-join-quiz',
  templateUrl: './join-quiz.component.html',
  styleUrl: './join-quiz.component.scss'
})
export class JoinQuizComponent {
  public dialogRef = inject(MatDialogRef<JoinQuizComponent>)
private _joinQuizService = inject(JoinQuizService)
private _formBuilder = inject(FormBuilder);
private _toastrService = inject(ToastrService)
joinQuizForm: FormGroup = this._formBuilder.group(
  {
    code: ['', [Validators.required]],
  }
);
joinQuiz(data: FormGroup): void {
  this._joinQuizService.onJoinQuiz(data.value).subscribe({
    next: (res)=> {
      this._toastrService.success('You have joined quiz Successfully');
    }, error:(err)=> {
      this._toastrService.error(err.error.message)
      this.dialogRef.close();
    }, complete:()=> {
      this.dialogRef.close();
    }
  })
}

}
