import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAddCartComponent } from './store-add-cart.component';

describe('StoreAddCartComponent', () => {
  let component: StoreAddCartComponent;
  let fixture: ComponentFixture<StoreAddCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreAddCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreAddCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
