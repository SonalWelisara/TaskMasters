import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostManageModalComponent } from './job-post-manage-modal.component';

describe('JobPostManageModalComponent', () => {
  let component: JobPostManageModalComponent;
  let fixture: ComponentFixture<JobPostManageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobPostManageModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobPostManageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
