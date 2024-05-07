import { TestBed } from '@angular/core/testing';

import { TempuserService } from './tempuser.service';

describe('TempuserService', () => {
  let service: TempuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
