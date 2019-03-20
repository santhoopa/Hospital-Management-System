import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistDashboardComponent } from './receptionist-dashboard.component';

describe('ReceptionistDashboardComponent', () => {
  let component: ReceptionistDashboardComponent;
  let fixture: ComponentFixture<ReceptionistDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionistDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
