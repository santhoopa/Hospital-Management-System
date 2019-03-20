import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistAdmitPatientComponent } from './receptionist-admit-patient.component';

describe('ReceptionistAdmitPatientComponent', () => {
  let component: ReceptionistAdmitPatientComponent;
  let fixture: ComponentFixture<ReceptionistAdmitPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionistAdmitPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionistAdmitPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
