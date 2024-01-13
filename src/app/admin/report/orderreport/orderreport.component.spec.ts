import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderreportComponent } from './orderreport.component';

describe('OrderreportComponent', () => {
  let component: OrderreportComponent;
  let fixture: ComponentFixture<OrderreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
