import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IGroup } from '../../../groups/interfaces/group.interface';
import { GroupsService } from '../../../groups/services/groups.service';
import { QuizesService } from '../../services/quizes.service';
import { IQuiz } from '../../interfaces/iquiz';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../../../../../../shared/components/delete-dialog/delete-dialog.component';
import { take } from 'rxjs';
declare var bootstrap: any; // Import Bootstrap JS globally

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrl: './view-quiz.component.scss',
})
export class ViewQuizComponent implements OnInit {
  dialog = inject(MatDialog);
  selectedDate: string = '';
  selectedTiem: string = '';
  route = inject(ActivatedRoute)
  router = inject(Router)
  id: string | null = null;
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
  groups: IGroup[] = [];
  duration: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  questionsNumbur: number[] = Array.from({ length: 50 }, (_, i) => i + 1);
  questionScore: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  quiz!: IQuiz;
  constructor(
    private _FormBuilder: FormBuilder,
    private groupsService: GroupsService,
    private _QuizesService: QuizesService,
    private _ToastrService: ToastrService,
    private datePipe: DatePipe,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.quizForm.disable();
  }
  ngOnInit(): void {
    this.getQuiz();
    this.getGroups();
  }
  getQuiz() {
    if (this.id) {
      this._QuizesService.onGetQuizById(this.id).subscribe({
        next: (res) => {
          this.quiz = res;
          this.quizForm.patchValue(res);
        },
        error: (err) => {
          this._ToastrService.error(err.message);
        },
      });
    }
  }
  getGroups() {
    this.groupsService.getGroups().subscribe({
      next: (groups: IGroup[]) => {
        this.groups = groups;
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
    updatedForm.schadule = this.datePipe.transform(
      updatedForm.schadule,
      'yyyy-MM-ddTHH:mm:ss'
    );
    this._QuizesService
      .onUpdateQuizById('6793a20533ff46523502fac3', updatedForm)
      .subscribe({
        next: (res) => {
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
  deleteQuiz() {
    this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        title: 'quiz',
      },
    }).afterClosed().pipe(take(1)).subscribe((result) => {
      if (result) {
        this._QuizesService.deleteQuiz(this.id!).subscribe({
          error: (err) => {
            this._ToastrService.error(err.message);
          },
          complete: () => {
            this._ToastrService.success('Quiz deleted successfully');
            this.router.navigate(['/dashboard/instructor/quizzes']);
          }
        });
      }
    })
  }
}
