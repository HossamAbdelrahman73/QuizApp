import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViewEditQuestionDialogComponent } from './add-view-edit-question-dialog.component';

describe('AddViewEditQuestionDialogComponent', () => {
  let component: AddViewEditQuestionDialogComponent;
  let fixture: ComponentFixture<AddViewEditQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddViewEditQuestionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddViewEditQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
