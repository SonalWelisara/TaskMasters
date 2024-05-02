import { TestBed } from '@angular/core/testing';

import { UserIdServiceService } from './user-id-service.service';

describe('UserIdServiceService', () => {
  let service: UserIdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
