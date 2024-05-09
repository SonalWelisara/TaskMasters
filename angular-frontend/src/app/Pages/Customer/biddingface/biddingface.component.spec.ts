import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingfaceComponent } from './biddingface.component';

describe('BiddingfaceComponent', () => {
  let component: BiddingfaceComponent;
  let fixture: ComponentFixture<BiddingfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BiddingfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiddingfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
