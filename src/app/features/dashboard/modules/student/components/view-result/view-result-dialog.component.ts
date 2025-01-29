import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISubmitQuizRes } from '../../interfaces/submit-quiz-res.interface';

@Component({
  selector: 'app-view-result-dialog',
  templateUrl: './view-result-dialog.component.html',
  styleUrl: './view-result-dialog.component.scss'
})
export class ViewResultDialogComponent implements OnInit {
  duration: string = '';
  readonly dialogRef = inject(MatDialogRef<ViewResultDialogComponent>);
  readonly data = inject<ISubmitQuizRes>(MAT_DIALOG_DATA);
  ngOnInit(): void {
    const startedAt = new Date(this.data.data.started_at);
    const finishedAt = new Date(this.data.data.finished_at);

    const diffMs = finishedAt.getTime() - startedAt.getTime();
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    this.duration = `${minutes} minutes, ${seconds} seconds`;
  }
}
