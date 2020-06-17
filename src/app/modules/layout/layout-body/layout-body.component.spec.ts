import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBodyComponent } from './layout-body.component';

describe('LayoutBodyComponent', () => {
  let component: LayoutBodyComponent;
  let fixture: ComponentFixture<LayoutBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
