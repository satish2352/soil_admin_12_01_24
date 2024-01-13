import { TestBed } from '@angular/core/testing';

import { MobileappService } from './mobileapp.service';

describe('MobileappService', () => {
  let service: MobileappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
