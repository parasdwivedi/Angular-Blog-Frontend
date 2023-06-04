import { TestBed } from '@angular/core/testing';

import { SuscribersService } from './suscribers.service';

describe('SuscribersService', () => {
  let service: SuscribersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuscribersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
