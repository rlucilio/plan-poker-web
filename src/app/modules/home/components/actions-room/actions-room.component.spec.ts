import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsRoomComponent } from './actions-room.component';

describe('ActionsRoomComponent', () => {
  let component: ActionsRoomComponent;
  let fixture: ComponentFixture<ActionsRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
