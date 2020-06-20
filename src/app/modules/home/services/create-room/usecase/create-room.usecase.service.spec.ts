import { TestBed } from '@angular/core/testing';

import { CreateRoomUsecaseService } from './create-room.usecase.service';

describe('CreateRoomService', () => {
  let service: CreateRoomUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateRoomUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
