import { TestBed } from '@angular/core/testing';

import { OverallInfoService } from './overall-info.service';

describe('OverallInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OverallInfoService = TestBed.get(OverallInfoService);
    expect(service).toBeTruthy();
  });
});
