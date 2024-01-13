import { TestBed } from '@angular/core/testing';

import { BannerbrService } from './bannerbr.service';

describe('BannerbrService', () => {
  let service: BannerbrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerbrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
