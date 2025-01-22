import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGroupDialogComponent } from './add-edit-group-dialog.component';

describe('AddEditGroupDialogComponent', () => {
  let component: AddEditGroupDialogComponent;
  let fixture: ComponentFixture<AddEditGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditGroupDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
