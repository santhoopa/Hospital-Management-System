import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSidemenuComponent } from './doctor-sidemenu.component';

describe('DoctorSidemenuComponent', () => {
  let component: DoctorSidemenuComponent;
  let fixture: ComponentFixture<DoctorSidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorSidemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
