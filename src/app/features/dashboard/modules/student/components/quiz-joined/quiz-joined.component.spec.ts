import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizJoinedComponent } from './quiz-joined.component';

describe('QuizJoinedComponent', () => {
  let component: QuizJoinedComponent;
  let fixture: ComponentFixture<QuizJoinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizJoinedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizJoinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
