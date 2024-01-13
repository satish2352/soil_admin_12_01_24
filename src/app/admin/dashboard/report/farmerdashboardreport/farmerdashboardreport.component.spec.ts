import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerdashboardreportComponent } from './farmerdashboardreport.component';

describe('FarmerdashboardreportComponent', () => {
  let component: FarmerdashboardreportComponent;
  let fixture: ComponentFixture<FarmerdashboardreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerdashboardreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerdashboardreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
