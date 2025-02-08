import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, Subject, takeUntil } from 'rxjs';
import { IAnswer } from '../../interfaces/answer.interface';
import { IQuestion, IQuestionsWithoutAnswers } from '../../interfaces/questions-without-answers.interface';
import { ISubmitQuizRes } from '../../interfaces/submit-quiz-res.interface';
import { studentRoutes } from '../../routes/student-routes';
import { QuizService } from '../../services/quiz/quiz.service';
import { ViewResultDialogComponent } from '../view-result/view-result-dialog.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _toast = inject(ToastrService);
  _quizService = inject(QuizService);
  _dialog = inject(MatDialog);

  id: string | null = null;
  selectedAnswer: string | null = null;
  questions: IQuestion[] = [];
  duration: number | null = null;
  currentQuestionNumber = 0;
  answers: string[] = [];
  submitQuizRes: ISubmitQuizRes | null = null;
  displayTime = '00:00';
  timeLeft = 0;
  timeUpWarning = false;
  private timerStarted = false;
  quizSubmitted = false;

  constructor() {
    this.id = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    const storedTimeLeft = localStorage.getItem(`quiz_${this.id}_timeLeft`);
    if (storedTimeLeft) {
      this.timeLeft = Number(storedTimeLeft);
      this.startTimer();
    }
    this._quizService.onGetQuestionsWithoutAnswers(this.id!).pipe(takeUntil(this._destroy$)).subscribe({
      next: (res: IQuestionsWithoutAnswers) => {
        this.questions = res.data.questions;
        if (storedTimeLeft === null) {
          this.timeLeft = res.data.duration * 60;
        }
        this.updateDisplayTime();
        this.startTimer();
      },
      error: (err) => {
        this._toast.error(err?.error?.message || 'Failed to fetch questions.');
      },
    });
  }
  startTimer(): void {
    if (this.timerStarted) return;
    this.timerStarted = true;
    interval(1000)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.updateDisplayTime();
          localStorage.setItem(`quiz_${this.id}_timeLeft`, this.timeLeft.toString());
          if (this.timeLeft === 10) {
            this.timeUpWarning = true;
          }
        } else {
          if (this.timerStarted && !this.quizSubmitted) {
            this.timerStarted = false;
            this.submitQuizAutomatically();
          }
        }
      });
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
    this.answers[this.currentQuestionNumber] = answer;
  }

  nextQuestion(): void {
    if (this.currentQuestionNumber === this.questions.length - 1) {
      const answers = this.answers.map((answer, index) => ({
        question: this.questions[index]._id,
        answer,
      }));
      this.submitQuiz(answers);
    } else {
      this.currentQuestionNumber++;
      this.selectedAnswer = this.answers[this.currentQuestionNumber] || null;
    }
  }

  prevQuestion(): void {
    if (this.currentQuestionNumber > 0) {
      this.currentQuestionNumber--;
      this.selectedAnswer = this.answers[this.currentQuestionNumber];
    }
  }

  resetAnswers(): void {
    this.answers = [];
    this.currentQuestionNumber = 0;
    this.selectedAnswer = null;
  }

  submitQuiz(answers: IAnswer[]): void {
    this._quizService.onSubmitQuiz(this.id!, answers).pipe(takeUntil(this._destroy$)).subscribe({
      next: (res: ISubmitQuizRes) => {
        this.submitQuizRes = res;
        localStorage.removeItem(`quiz_${this.id}_timeLeft`);
        this.quizSubmitted = true;
        this.timeLeft = 0;
        this.updateDisplayTime();
        this.viewResultDialog(res);
      },
      error: (err) => {
        this._toast.error(err?.error?.message || 'Failed to submit quiz.');
      },
    });
  }

  submitQuizAutomatically(): void {
    this._toast.warning('Time is up! Submitting your quiz.');
    const answers = this.answers.map((answer, index) => ({
      question: this.questions[index]?._id,
      answer: answer || '', // Handle unanswered questions
    }));
    this.submitQuiz(answers);
  }

  viewResultDialog(results: ISubmitQuizRes): void {
    this._dialog.open(ViewResultDialogComponent, {
      data: results,
      width: '500px',
    }).afterClosed().subscribe(() => {
      this._router.navigate([studentRoutes.QUIZZES]);
    });
  }

  updateDisplayTime(): void {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.displayTime = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }

  formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  @HostListener('window:beforeunload', ['$event'])
  warnUserBeforeExit(event: BeforeUnloadEvent): void {
    event.preventDefault();
    event.returnValue = 'You have an ongoing quiz. Leaving will submit it automatically.';
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

