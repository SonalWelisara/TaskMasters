import { TestBed } from '@angular/core/testing';

import { StoreAddCartService } from './store-add-cart.service';

describe('StoreAddCartService', () => {
  let service: StoreAddCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreAddCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
