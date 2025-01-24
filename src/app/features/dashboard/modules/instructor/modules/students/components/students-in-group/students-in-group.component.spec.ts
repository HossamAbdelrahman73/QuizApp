import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsInGroupComponent } from './students-in-group.component';

describe('StudentsInGroupComponent', () => {
  let component: StudentsInGroupComponent;
  let fixture: ComponentFixture<StudentsInGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsInGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsInGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
