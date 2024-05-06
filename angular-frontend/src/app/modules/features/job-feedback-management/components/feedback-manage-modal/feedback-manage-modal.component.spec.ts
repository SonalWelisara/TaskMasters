import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackManageModalComponent } from './feedback-manage-modal.component';

describe('FeedbackManageModalComponent', () => {
  let component: FeedbackManageModalComponent;
  let fixture: ComponentFixture<FeedbackManageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackManageModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackManageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
