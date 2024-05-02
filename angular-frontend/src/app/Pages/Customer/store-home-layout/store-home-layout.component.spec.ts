import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHomeLayoutComponent } from './store-home-layout.component';

describe('StoreHomeLayoutComponent', () => {
  let component: StoreHomeLayoutComponent;
  let fixture: ComponentFixture<StoreHomeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreHomeLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreHomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
