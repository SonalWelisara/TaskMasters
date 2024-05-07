import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreNavBarComponent } from './store-nav-bar.component';

describe('StoreNavBarComponent', () => {
  let component: StoreNavBarComponent;
  let fixture: ComponentFixture<StoreNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
