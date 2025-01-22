import { Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared-service/shared.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.scss'
})
export class InstructorComponent implements OnInit{
  private _SharedService = inject(SharedService)
  ngOnInit(): void {
    this.getFiveIncomingQuiz()
    this.getTopFiveStudents()
  }
getTopFiveStudents():void {
this._SharedService.onGetTopFiveStudents().subscribe({
  next: (res) => {
    console.log(res);
  },
  error: (err) => {
    console.log(err);
  }
})
}
getFiveIncomingQuiz():void {
  this._SharedService.onGetFiveIncomingQuiz().subscribe({
    next: (res) => {
      console.log(res);
    },
    error: (err) => {
      console.log(err);
    }
  })
  }
}
