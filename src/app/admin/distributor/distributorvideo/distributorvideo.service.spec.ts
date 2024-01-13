import { TestBed } from '@angular/core/testing';

import { DistributorvideoService } from './distributorvideo.service';

describe('DistributorvideoService', () => {
  let service: DistributorvideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistributorvideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
