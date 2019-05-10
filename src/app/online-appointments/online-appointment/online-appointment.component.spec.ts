import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineAppointmentComponent } from './online-appointment.component';

describe('OnlineAppointmentComponent', () => {
  let component: OnlineAppointmentComponent;
  let fixture: ComponentFixture<OnlineAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
