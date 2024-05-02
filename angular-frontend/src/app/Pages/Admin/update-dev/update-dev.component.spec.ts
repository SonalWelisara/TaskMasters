import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDevComponent } from './update-dev.component';

describe('UpdateDevComponent', () => {
  let component: UpdateDevComponent;
  let fixture: ComponentFixture<UpdateDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateDevComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
