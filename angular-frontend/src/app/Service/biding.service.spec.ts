import { TestBed } from '@angular/core/testing';

import { BidingService } from './biding.service';

describe('BidingService', () => {
  let service: BidingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BidingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
