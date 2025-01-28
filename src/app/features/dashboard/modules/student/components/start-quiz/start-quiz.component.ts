import { Component, inject } from '@angular/core';
import { JoinQuizService } from '../../services/service-join-quiz/join-quiz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrl: './start-quiz.component.scss'
})
export class StartQuizComponent {
  private _joinQuizService = inject(JoinQuizService)
  private _activatedRoute = inject(ActivatedRoute)
  quizId : string | null = ''
  ngOnInit(): void {
    this.quizId = this._activatedRoute.snapshot.paramMap.get('quizID')
this.getQuestions()
  }
getQuestions():void {
  console.log(this.quizId);

// this._joinQuizService.onGetQuizQuestions(this.quizId as string).subscribe({
//   next:(res)=> {
//     console.log(res);
//   }, error:(err)=> {
//     console.log(err);

//   }
// })
}
}
