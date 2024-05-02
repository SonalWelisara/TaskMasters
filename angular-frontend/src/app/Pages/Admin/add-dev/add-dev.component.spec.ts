import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDevComponent } from './add-dev.component';

describe('AddDevComponent', () => {
  let component: AddDevComponent;
  let fixture: ComponentFixture<AddDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDevComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
