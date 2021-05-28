import { TestBed } from '@angular/core/testing';

import { SpringbootService } from './springboot.service';

describe('SpringbootService', () => {
  let service: SpringbootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpringbootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
