import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingAdminComponent } from './bidding-admin.component';

describe('BiddingAdminComponent', () => {
  let component: BiddingAdminComponent;
  let fixture: ComponentFixture<BiddingAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BiddingAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiddingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
