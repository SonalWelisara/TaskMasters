import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFeedbackManagementComponent } from './job-feedback-management.component';

describe('JobFeedbackManagementComponent', () => {
  let component: JobFeedbackManagementComponent;
  let fixture: ComponentFixture<JobFeedbackManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobFeedbackManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobFeedbackManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
