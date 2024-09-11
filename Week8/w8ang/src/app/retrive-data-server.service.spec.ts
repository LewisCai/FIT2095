import { TestBed } from '@angular/core/testing';

import { RetriveDataServerService } from './retrive-data-server.service';

describe('RetriveDataServerService', () => {
  let service: RetriveDataServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetriveDataServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
