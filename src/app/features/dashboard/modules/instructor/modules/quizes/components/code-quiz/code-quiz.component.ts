import { ToastrService } from 'ngx-toastr';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-code-quiz',
  templateUrl: './code-quiz.component.html',
  styleUrl: './code-quiz.component.scss',
})
export class CodeQuizComponent {
  constructor(
    public dialogRef: MatDialogRef<CodeQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clipboard: Clipboard,
    private _ToastrService: ToastrService
  ) {}

  copyToClipboard(code: string): void {
    this.clipboard.copy(this.data);
    this._ToastrService.success(`Code copied Successfully`);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
