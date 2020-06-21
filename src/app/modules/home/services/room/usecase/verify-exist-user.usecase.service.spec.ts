import { TestBed } from '@angular/core/testing';

import { UsecaseService } from './verify-exist-user.usecase.service';

describe('UsecaseService', () => {
  let service: UsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
