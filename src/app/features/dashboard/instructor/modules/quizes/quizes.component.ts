import { quizRoutes } from './routes/quiz-routes';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrl: './quizes.component.scss'
})
export class QuizesComponent {
  dialog = inject(MatDialog);
  quizRoutes = quizRoutes;
}
