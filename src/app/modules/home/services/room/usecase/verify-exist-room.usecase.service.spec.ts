import { TestBed } from '@angular/core/testing';

import { VerifyExistRoomUsecaseService } from './verify-exist-room.usecase.service';

describe('VerifyExistRoomUsecaseService', () => {
  let service: VerifyExistRoomUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyExistRoomUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
