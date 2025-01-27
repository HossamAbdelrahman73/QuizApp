import { TestBed } from '@angular/core/testing';

import { ResultsInstructorService } from './results-instructor.service';

describe('ResultsInstructorService', () => {
  let service: ResultsInstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultsInstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
