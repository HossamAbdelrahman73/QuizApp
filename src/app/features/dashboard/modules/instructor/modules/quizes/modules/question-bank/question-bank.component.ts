import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddViewEditQuestionDialogComponent } from './components/add-view-edit-question-dialog/add-view-edit-question-dialog.component';
import { QuestionBankService } from './services/question-bank.service';
import { ToastrService } from 'ngx-toastr';
import { IBank } from './interfaces/ibank';
import { DeleteDialogComponent } from '../../../../../../../../shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.scss',
})
export class QuestionBankComponent implements OnInit {
  questionsBankService = inject(QuestionBankService);
  dialog = inject(MatDialog);
  page: number = 1;
  itemsPerPage: number = 5;
  toast = inject(ToastrService);

  questions: IBank[] = [];
  constructor(private _QuestionBankService: QuestionBankService) {}

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this._QuestionBankService.onGetQuestions().subscribe({
      next: (res) => {
        console.log(res);
        this.questions = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onCreateQuestion() {
    const dialogRef = this.dialog.open(AddViewEditQuestionDialogComponent, {
      width: '800px',
      data: {
        title: 'Set up a new question',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.questionsBankService.createQuestion(result).subscribe({
          error: () => {
            this.toast.error('Failed to create question');
          },
          complete: () => {
            this.toast.success('Question created successfully');
          },
        });
      }
    });
  }
  deleteQuestion(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        title: 'question',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._QuestionBankService.onDeleteQustion(id).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            this.toast.error(err.error.message);
          },
          complete: () => {
            this.toast.success('Question deleted successfully');
            this.getAllQuestions()
          },
        });
      }
    });
  }
  
}
