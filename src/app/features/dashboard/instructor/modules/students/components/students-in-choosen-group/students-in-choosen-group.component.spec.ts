import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsInChoosenGroupComponent } from './students-in-choosen-group.component';

describe('StudentsInChoosenGroupComponent', () => {
  let component: StudentsInChoosenGroupComponent;
  let fixture: ComponentFixture<StudentsInChoosenGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsInChoosenGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsInChoosenGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
