import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddRoomsComponent } from './admin-add-rooms.component';

describe('AdminAddRoomsComponent', () => {
  let component: AdminAddRoomsComponent;
  let fixture: ComponentFixture<AdminAddRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
