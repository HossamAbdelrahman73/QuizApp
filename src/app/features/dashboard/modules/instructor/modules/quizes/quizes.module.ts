import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizesRoutingModule } from './quizes-routing.module';
import { QuizesComponent } from './quizes.component';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { AllQuizesComponent } from './components/all-quizes/all-quizes.component';
import { CodeQuizComponent } from './components/code-quiz/code-quiz.component';
import { SharedModule } from '../../../../../../shared/shared.module';

@NgModule({
  declarations: [
    QuizesComponent,
    ViewQuizComponent,
    AllQuizesComponent,
    CodeQuizComponent,
  ],
  imports: [
    CommonModule,
    QuizesRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule
  ],
  providers: [],
})
export class QuizesModule {}
