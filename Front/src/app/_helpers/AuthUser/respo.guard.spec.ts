import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { respoGuard } from './respo.guard';

describe('respoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => respoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
