import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAndRatingComponent } from './feedback-and-rating.component';

describe('FeedbackAndRatingComponent', () => {
  let component: FeedbackAndRatingComponent;
  let fixture: ComponentFixture<FeedbackAndRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackAndRatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackAndRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
