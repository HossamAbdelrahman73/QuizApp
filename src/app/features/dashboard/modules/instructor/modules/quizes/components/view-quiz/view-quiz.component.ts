import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IGroup } from '../../../groups/interfaces/group.interface';
import { GroupsService } from '../../../groups/services/groups.service';
import { QuizesService } from '../../services/quizes.service';
import { IQuiz } from '../../interfaces/iquiz';
declare var bootstrap: any; // Import Bootstrap JS globally

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrl: './view-quiz.component.scss',
})
export class ViewQuizComponent implements OnInit {
  selectedDate: string = '';
  selectedTiem: string = '';

  quizForm = this._FormBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    group: ['', [Validators.required]],
    questions_number: [0, [Validators.required]],
    difficulty: ['', [Validators.required]],
    type: ['', [Validators.required]],
    schadule: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    score_per_question: ['', [Validators.required]],
  });
  toppings = new FormControl('');
  groups: IGroup[] = [];
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  duration: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  questionsNumbur: number[] = Array.from({ length: 50 }, (_, i) => i + 1);
  questionScore: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  quiz!: IQuiz;

  constructor(
    private _FormBuilder: FormBuilder,
    private groupsService: GroupsService,
    private _QuizesService: QuizesService,
    private _ToastrService: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getQuiz();
    this.getGroups();
  }

  getQuiz() {
    this._QuizesService.onGetQuizById('6793a20533ff46523502fac3').subscribe({
      next: (res) => {
        console.log(res);
        this.quiz = res;
        this.quizForm.patchValue({
          title: this.quiz.title,
          description: this.quiz.description,
          score_per_question: this.quiz.score_per_question.toString(),
          schadule: this.quiz.schadule,
          duration: this.quiz.duration.toString(),
          group: this.quiz.group,
          questions_number: this.quiz.questions_number,
          difficulty: this.quiz.difficulty,
          type: this.quiz.type,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getGroups() {
    this.groupsService.getGroups().subscribe({
      next: (groups: IGroup[]) => {
        this.groups = groups;
        console.log(groups);
      },
      error: (err) => {
        this._ToastrService.error(err.message);
      },
    });
  }

  createQuiz() {
    const modalElement = document.getElementById('createQuiz');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  sendData() {
    this.quizForm.value.questions_number = Number(
      this.quizForm.value.questions_number
    );

    let updatedForm = {
      title: this.quizForm?.value?.title,
      description: this.quizForm?.value?.description,
      score_per_question: this.quizForm?.value?.score_per_question,
      schadule: this.quizForm?.value?.schadule,
      duration: this.quizForm?.value?.duration,
    };
    // this.quizForm.value.schadule=this.quizForm.value.schadule

    updatedForm.schadule = this.datePipe.transform(
      updatedForm.schadule,
      'yyyy-MM-ddTHH:mm:ss'
    );
    console.log(this.quizForm.value);
    this._QuizesService
      .onUpdateQuizById('6793a20533ff46523502fac3', updatedForm)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._ToastrService.success(res.message);
          this.closeModal();
        },
        error: (err) => {
          err.message.forEach((errMess: string) => {
            this._ToastrService.error(errMess);
            this.closeModal();
          });
        },
      });
  }
  removeBackdrop() {
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach((backdrop) => backdrop.remove());
  }

  closeModal() {
    const modalElement = document.getElementById('createQuiz');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    this.removeBackdrop();
  }
}
