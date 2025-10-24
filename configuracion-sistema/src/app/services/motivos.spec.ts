import { TestBed } from '@angular/core/testing';

import { Motivos } from './motivos';

describe('Motivos', () => {
  let service: Motivos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Motivos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
