import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeQuizComponent } from './code-quiz.component';

describe('CodeQuizComponent', () => {
  let component: CodeQuizComponent;
  let fixture: ComponentFixture<CodeQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
