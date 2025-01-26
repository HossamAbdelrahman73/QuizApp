import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
import { SharedModule } from '../../../../../../shared/shared.module';

@NgModule({
  declarations: [QuizesComponent, ViewQuizComponent],
  imports: [
    CommonModule,
    QuizesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule
  ],
  providers: [DatePipe],
})
export class QuizesModule {}
