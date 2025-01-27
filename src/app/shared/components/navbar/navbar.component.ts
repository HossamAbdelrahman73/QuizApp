import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SharedService } from '../../services/shared-service/shared.service';
import { IProfile } from '../../interfaces/iprofile';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IGroup } from '../../../features/dashboard/modules/instructor/modules/groups/interfaces/group.interface';
import { GroupsService } from '../../../features/dashboard/modules/instructor/modules/groups/services/groups.service';
import { IQuiz } from '../../../features/dashboard/modules/instructor/modules/quizes/interfaces/iquiz';
import { quizRoutes } from '../../../features/dashboard/modules/instructor/modules/quizes/routes/quiz-routes';
import { QuizesService } from '../../../features/dashboard/modules/instructor/modules/quizes/services/quizes.service';
import { DashboardService } from '../../../features/dashboard/services/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { CodeQuizComponent } from '../../../features/dashboard/modules/instructor/modules/quizes/components/code-quiz/code-quiz.component';
declare var bootstrap: any; // Import Bootstrap JS globally

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private _SharedService = inject(SharedService);
  private _Router = inject(Router);
  routerSubscription!: Subscription;
  profile: IProfile = {} as IProfile;
  showMenu: boolean = false;
  role: string = '';
  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  currentPath: string = '';
  sectionTitle: string = '';
  quizRoutes = quizRoutes;
  selectedDate: string = '';
  selectedTiem: string = '';
  toppings = new FormControl('');

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
  groups: IGroup[] = [];
  quizSub!: Subscription;
  upCommingQuizSub!: Subscription;
  quizList: IQuiz[] = [];
  duration: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  questionsNumbur: number[] = Array.from({ length: 50 }, (_, i) => i + 1);
  questionScore: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(
    private _FormBuilder: FormBuilder,
    private groupsService: GroupsService,
    private _QuizesService: QuizesService,
    private _ToastrService: ToastrService,
    private _DashboardService: DashboardService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getGroups();
    this.profile = (localStorage.getItem('profile') as string)
      ? JSON.parse(localStorage.getItem('profile') as string)
      : undefined;
    this.role = this.profile.role as string;
    this.firstName = this.profile.first_name as string;
    this.lastName = this.profile.last_name as string;
    this.userName = this.firstName + this.lastName;
    this.getUrl();
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
        this.getCode(res.data.code);
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

  getCode(code: string) {
    const dialogRef = this.dialog.open(CodeQuizComponent, {
      data: code,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
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

  getUrl(): void {
    this.routerSubscription = this._Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects;
      } else if (!(event instanceof NavigationEnd)) {
        this.currentPath = this._Router.url;
      }
      this.getSectionTitle();
    });
  }
  getSectionTitle(): void {
    const urlParts = this.currentPath.split('/');
    if (urlParts.length < 5) {
      this.sectionTitle = urlParts[urlParts.length - 1];
    } else if (urlParts.length === 5) {
      this.sectionTitle = urlParts[urlParts.length - 2];
    }
  }
  logout(): void {
    localStorage.clear();
    this._Router.navigate(['/auth/login']);
  }
  changePassword() {
    this._Router.navigate(['/auth/change-password']);
  }
  ngOnDestroy() {
    // this.routerSubscription.unsubscribe();
  }
}
