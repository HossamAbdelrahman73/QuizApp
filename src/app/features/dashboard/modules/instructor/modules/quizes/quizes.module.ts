import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { QuizesRoutingModule } from './quizes-routing.module';
import { QuizesComponent } from './quizes.component';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { AllQuizesComponent } from './components/all-quizes/all-quizes.component';
import { CodeQuizComponent } from './components/code-quiz/code-quiz.component';

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
  ],
  providers: [],
})
export class QuizesModule {}
