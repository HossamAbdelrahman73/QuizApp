import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditDialogComponent } from './view-edit-dialog.component';

describe('ViewEditDialogComponent', () => {
  let component: ViewEditDialogComponent;
  let fixture: ComponentFixture<ViewEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
