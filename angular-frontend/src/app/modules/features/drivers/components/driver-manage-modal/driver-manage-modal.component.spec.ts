import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverManageModalComponent } from './driver-manage-modal.component';

describe('DriverManageModalComponent', () => {
  let component: DriverManageModalComponent;
  let fixture: ComponentFixture<DriverManageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriverManageModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverManageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
