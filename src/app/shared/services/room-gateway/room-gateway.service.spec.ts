import { TestBed } from '@angular/core/testing';

import { RoomGatewayService } from './room-gateway.service';

describe('RoomGatewayService', () => {
  let service: RoomGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
