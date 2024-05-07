import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePersonalComponent } from './employee-personal.component';

describe('EmployeePersonalComponent', () => {
  let component: EmployeePersonalComponent;
  let fixture: ComponentFixture<EmployeePersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeePersonalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
