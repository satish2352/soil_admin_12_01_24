import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributordashboardreportComponent } from './distributordashboardreport.component';

describe('DistributordashboardreportComponent', () => {
  let component: DistributordashboardreportComponent;
  let fixture: ComponentFixture<DistributordashboardreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributordashboardreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributordashboardreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
