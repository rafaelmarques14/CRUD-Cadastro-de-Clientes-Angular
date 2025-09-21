import { TestBed } from '@angular/core/testing';

import { Brasilapi } from './brasilapi';

describe('Brasilapi', () => {
  let service: Brasilapi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Brasilapi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
