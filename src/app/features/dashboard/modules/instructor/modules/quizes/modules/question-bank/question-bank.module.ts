import { QuestionBankService } from './services/question-bank.service';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionBankRoutingModule } from './question-bank-routing.module';
import { QuestionBankComponent } from './question-bank.component';
import { SharedModule } from '../../../../../../../../shared/shared.module';
import { AddViewEditQuestionDialogComponent } from './components/add-view-edit-question-dialog/add-view-edit-question-dialog.component';
import { DescriptionPipe } from './pipes/description.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuestionBankComponent,
    AddViewEditQuestionDialogComponent,
    DescriptionPipe,
  ],
  imports: [CommonModule, QuestionBankRoutingModule, SharedModule, FormsModule],
})
export class QuestionBankModule {}
