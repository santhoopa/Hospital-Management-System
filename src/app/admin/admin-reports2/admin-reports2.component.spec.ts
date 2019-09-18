import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReports2Component } from './admin-reports2.component';

describe('AdminReports2Component', () => {
  let component: AdminReports2Component;
  let fixture: ComponentFixture<AdminReports2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReports2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReports2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
