import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionBankRoutingModule } from './question-bank-routing.module';
import { QuestionBankComponent } from './question-bank.component';


@NgModule({
  declarations: [
    QuestionBankComponent
  ],
  imports: [
    CommonModule,
    QuestionBankRoutingModule
  ]
})
export class QuestionBankModule { }
