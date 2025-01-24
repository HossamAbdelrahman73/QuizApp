import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionBankRoutingModule } from './question-bank-routing.module';
import { QuestionBankComponent } from './question-bank.component';
import { SharedModule } from '../../../../../../../../shared/shared.module';
import { AddViewEditQuestionDialogComponent } from './components/add-view-edit-question-dialog/add-view-edit-question-dialog.component';


@NgModule({
  declarations: [
    QuestionBankComponent,
    AddViewEditQuestionDialogComponent
  ],
  imports: [
    CommonModule,
    QuestionBankRoutingModule,
    SharedModule
  ]
})
export class QuestionBankModule { }
