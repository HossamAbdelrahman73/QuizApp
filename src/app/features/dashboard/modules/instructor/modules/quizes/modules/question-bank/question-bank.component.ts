import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddViewEditQuestionDialogComponent } from './components/add-view-edit-question-dialog/add-view-edit-question-dialog.component';
import { QuestionBankService } from './services/question-bank.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.scss'
})
export class QuestionBankComponent {
  questionsBankService = inject(QuestionBankService);
  dialog = inject(MatDialog);
  toast = inject(ToastrService);
  onCreateQuestion() {
    const dialogRef = this.dialog.open(AddViewEditQuestionDialogComponent, {
      width: '800px',
      data: {
        title: 'Set up a new question'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.questionsBankService.createQuestion(result).subscribe({
          error: () => {
            this.toast.error('Failed to create question');
          },
          complete: () => {
            this.toast.success('Question created successfully');
          }
        });
      }
    })
  }
}
