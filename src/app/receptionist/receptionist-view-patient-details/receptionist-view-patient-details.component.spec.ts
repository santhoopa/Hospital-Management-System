import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistViewPatientDetailsComponent } from './receptionist-view-patient-details.component';

describe('ReceptionistViewPatientDetailsComponent', () => {
  let component: ReceptionistViewPatientDetailsComponent;
  let fixture: ComponentFixture<ReceptionistViewPatientDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionistViewPatientDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionistViewPatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
