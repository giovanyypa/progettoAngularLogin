import { TestBed } from '@angular/core/testing';

import { KeyckloakService } from './keyckloak.service';

describe('KeyckloakService', () => {
  let service: KeyckloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyckloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
