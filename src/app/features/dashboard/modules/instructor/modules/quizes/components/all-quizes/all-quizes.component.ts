import { Component, OnInit } from '@angular/core';
import { QuizesService } from '../../services/quizes.service';
import { IQuiz } from '../../interfaces/iquiz';

@Component({
  selector: 'app-all-quizes',
  templateUrl: './all-quizes.component.html',
  styleUrl: './all-quizes.component.scss',
})
export class AllQuizesComponent implements OnInit {
  quizes: IQuiz[] = [];
  constructor(private _QuizesService: QuizesService) {}

  ngOnInit(): void {
    this.getAllquizes();
  }

  getAllquizes() {
    this._QuizesService.onGetAllQuizzes().subscribe({
      next: (res) => {
        console.log(res);
        this.quizes = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
