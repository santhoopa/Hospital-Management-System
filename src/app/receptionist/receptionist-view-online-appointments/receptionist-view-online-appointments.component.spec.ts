import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistViewOnlineAppointmentsComponent } from './receptionist-view-online-appointments.component';

describe('ReceptionistViewOnlineAppointmentsComponent', () => {
  let component: ReceptionistViewOnlineAppointmentsComponent;
  let fixture: ComponentFixture<ReceptionistViewOnlineAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionistViewOnlineAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionistViewOnlineAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
