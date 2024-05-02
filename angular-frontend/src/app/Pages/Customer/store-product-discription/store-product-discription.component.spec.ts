import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductDiscriptionComponent } from './store-product-discription.component';

describe('StoreProductDiscriptionComponent', () => {
  let component: StoreProductDiscriptionComponent;
  let fixture: ComponentFixture<StoreProductDiscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreProductDiscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreProductDiscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
