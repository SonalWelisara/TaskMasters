import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbakListComponent } from './feedbak-list.component';

describe('FeedbakListComponent', () => {
  let component: FeedbakListComponent;
  let fixture: ComponentFixture<FeedbakListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbakListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbakListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
