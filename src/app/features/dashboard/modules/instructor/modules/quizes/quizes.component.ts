import { ToastrService } from 'ngx-toastr';
import { QuizesService } from './services/quizes.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { GroupsService } from '../groups/services/groups.service';
import { IGroup } from '../groups/interfaces/group.interface';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { quizRoutes } from './routes/quiz-routes';
import { ITableColumnConfig } from '../../../../../../shared/interfaces/table/table-column-config.interface';
declare var bootstrap: any; // Import Bootstrap JS globally

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrl: './quizes.component.scss',
})
export class QuizesComponent implements OnInit {

  dialog = inject(MatDialog);
  quizesService = inject(QuizesService);
  quizRoutes = quizRoutes;
  selectedDate: string = '';
  selectedTiem: string = '';
  completedQuizes: any[] = [];
  completedQuizesColumns: ITableColumnConfig[] = [
    { key: 'title', label: 'Title' },
    { key: 'questions_number', label: 'Question number' },
    { key: 'difficulty', label: 'Difficulty' },
    { key: 'schadule', label: 'Schedule', pipe: { type: 'date', format: 'dd/MM/yyyy' } },
    { key: 'type', label: 'Type' },
    { key: 'duration', label: 'Duration' },
    { key: 'score_per_question', label: 'Score/question' },
  ];

  quizForm = this._FormBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    group: ['', [Validators.required]],
    questions_number: [0, [Validators.required]],
    difficulty: ['', [Validators.required]],
    type: ['', [Validators.required]],
    schadule: [null, [Validators.required]],
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

  constructor(
    private _FormBuilder: FormBuilder,
    private groupsService: GroupsService,
    private _QuizesService: QuizesService,
    private _ToastrService: ToastrService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getGroups();
    this.getCompletedQuizes();
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
    // this.quizForm.value.schadule=this.quizForm.value.schadule

    this.quizForm.value.schadule = this.datePipe.transform(
      this.quizForm.get('schadule')?.value,
      'yyyy-MM-ddTHH:mm:ss'
    );
    console.log(this.quizForm.value);
    this._QuizesService.onCreateQuiz(this.quizForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message);
        this.closeModal();
        this.quizForm.reset();
      },
      error: (err) => {
        err.message.forEach((errMess: string) => {
          this._ToastrService.error(errMess);
          this.closeModal();
          this.quizForm.reset();
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
  getCompletedQuizes() {
    this._QuizesService.getLastFiveQuizes().subscribe({
      next: (quizes: any) => {
        console.log(quizes);
        this.completedQuizes = quizes;
      },
      error: (err) => {
        this._ToastrService.error(err.message);
      },
    });
  }
  editQuiz(row: any): void {
    console.log(row);
  }
}

