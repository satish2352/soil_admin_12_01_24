import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleaddComponent } from './scheduleadd.component';

describe('ScheduleaddComponent', () => {
  let component: ScheduleaddComponent;
  let fixture: ComponentFixture<ScheduleaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
