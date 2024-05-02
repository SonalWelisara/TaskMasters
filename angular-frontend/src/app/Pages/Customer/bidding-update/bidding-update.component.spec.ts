import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingUpdateComponent } from './bidding-update.component';

describe('BiddingUpdateComponent', () => {
  let component: BiddingUpdateComponent;
  let fixture: ComponentFixture<BiddingUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BiddingUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiddingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
