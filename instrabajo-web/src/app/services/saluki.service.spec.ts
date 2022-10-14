import { TestBed } from '@angular/core/testing';

import { SalukiService } from './saluki.service';

describe('SalukiService', () => {
  let service: SalukiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalukiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
