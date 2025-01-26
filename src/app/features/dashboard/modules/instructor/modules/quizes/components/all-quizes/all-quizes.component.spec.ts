import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuizesComponent } from './all-quizes.component';

describe('AllQuizesComponent', () => {
  let component: AllQuizesComponent;
  let fixture: ComponentFixture<AllQuizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllQuizesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllQuizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
