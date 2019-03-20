import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistViewDoctorComponent } from './receptionist-view-doctor.component';

describe('ReceptionistViewDoctorComponent', () => {
  let component: ReceptionistViewDoctorComponent;
  let fixture: ComponentFixture<ReceptionistViewDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionistViewDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionistViewDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
