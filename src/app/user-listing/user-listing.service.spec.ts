import { TestBed } from '@angular/core/testing';

import { UserListingService } from './user-listing.service';

describe('UserListingService', () => {
  let service: UserListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
