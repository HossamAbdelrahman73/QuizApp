import { Component, inject, OnInit } from '@angular/core';
import { StudentResultsService } from './services/student-results.service';

@Component({
  selector: 'app-student-results',
  templateUrl: './student-results.component.html',
  styleUrl: './student-results.component.scss',
})
export class StudentResultsComponent implements OnInit {
  private _studentResultsService = inject(StudentResultsService);
  ngOnInit(): void {
    this.getAllResults();
  }
  getAllResults(): void {
    this._studentResultsService.onGetAllResults().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
