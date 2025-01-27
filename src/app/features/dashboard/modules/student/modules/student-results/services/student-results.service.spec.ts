import { TestBed } from '@angular/core/testing';

import { StudentResultsService } from './student-results.service';

describe('StudentResultsService', () => {
  let service: StudentResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
