import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddViewEditQuestionDialogComponent } from './components/add-view-edit-question-dialog/add-view-edit-question-dialog.component';
import { QuestionBankService } from './services/question-bank.service';
import { ToastrService } from 'ngx-toastr';
import { IBank } from './interfaces/ibank';
import { IGetQuestion } from './interfaces/question.interface';
import { ITableColumnConfig } from '../../../../../../../../shared/interfaces/table/table-column-config.interface';
import { DeleteDialogComponent } from '../../../../../../../../shared/components/delete-dialog/delete-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.scss',
})
export class QuestionBankComponent implements OnInit {
  questionsBankService = inject(QuestionBankService);
  toast = inject(ToastrService);
  dialog = inject(MatDialog);
  page: number = 1;
  itemsPerPage: number = 5;
  questions: IBank[] = [];
  difficulty: any;
  type: any;
  tableColumns: ITableColumnConfig[] = [
    { key: 'title', label: 'title' },
    { key: 'description', label: 'description', pipe: { type: 'truncate', format: 50 } },
    { key: 'answer', label: 'Correct answer' },
    { key: 'difficulty', label: 'Difficulty' },
    {
      key: 'actions', label: 'Actions', isAction: true, actions: [
        { label: 'View', icon: 'visibility', color: 'orange-color', action: (row: IGetQuestion) => this.viewQuestion(row) },
        { label: 'Edit', icon: 'edit_square', color: 'orange-color', action: (row: IGetQuestion) => this.editQuestion(row) },
        { label: 'Delete', icon: 'delete', color: 'orange-color', action: (row: IGetQuestion) => this.deleteQuestion(row._id) },
      ]
    },
  ]
  constructor() { }
serchQuestionForm: FormGroup = new FormGroup({
  difficulty: new FormControl(['']),
  type: new FormControl(['']),
})
  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionsBankService.onGetQuestions().subscribe({
      next: (res: IGetQuestion[]) => {
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
  viewQuestion(row: IGetQuestion) {
    this.openAddViewEditQuestionDialog('View question', row, true);
  }
  editQuestion(row: IGetQuestion) {
    this.openAddViewEditQuestionDialog('Edit question', row, false).afterClosed().subscribe((result) => {
      if (result) {
        this.questionsBankService.updateQuestion(result, row._id).subscribe({
          error: () => {
            this.toast.error('Failed to update question');
          },
          complete: () => {
            this.toast.success('Question updated successfully');
            this.getAllQuestions();
          },
        });
      }
    });
  }
  deleteQuestion(id: string) {
    this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'question',
      },
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.questionsBankService.deleteQuestion(id).subscribe({
          error: () => {
            this.toast.error('Failed to delete question');
          },
          complete: () => {
            this.toast.success('Question deleted successfully');
            this.getAllQuestions();
          },
        });
      }
    })
  }
  openAddViewEditQuestionDialog(title: string, question: IGetQuestion, isViewMode: boolean) {
    return this.dialog.open(AddViewEditQuestionDialogComponent, {
      width: '800px',
      data: {
        title,
        question,
        isViewMode
      },
    });
  }
  searchQuestion(data : FormGroup):void {
    this.questionsBankService.onSearchQuestion(data.value).subscribe({
      next:(res)=> {
        this.questions = res;
      }, error:(err)=> {
        console.log(err);
      }
    })
  }
  resetInputs():void {
console.log('hello');

//     this.difficulty = null
//     this.type = null
// this.serchQuestionForm.patchValue({
//   difficulty: null,
//   type: null
// })
// this.getAllQuestions()
//
}

sayHi():void {
  console.log("hello");

}

}
