import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistScheduleAppointmentsComponent } from './receptionist-schedule-appointments.component';

describe('ReceptionistScheduleAppointmentsComponent', () => {
  let component: ReceptionistScheduleAppointmentsComponent;
  let fixture: ComponentFixture<ReceptionistScheduleAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionistScheduleAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionistScheduleAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
