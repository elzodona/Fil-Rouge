import { TestBed } from '@angular/core/testing';

import { BreukhService } from './breukh.service';

describe('BreukhService', () => {
  let service: BreukhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreukhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
