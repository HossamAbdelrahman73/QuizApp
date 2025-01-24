import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionBankRoutingModule } from './question-bank-routing.module';
import { QuestionBankComponent } from './question-bank.component';
import { AddViewEditQuestionDialogComponent } from './components/add-view-edit-question-dialog/add-view-edit-question-dialog.component';
import { SharedModule } from '../../../../../../../shared/shared.module';


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
