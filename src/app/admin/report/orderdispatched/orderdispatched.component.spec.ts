import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdispatchedComponent } from './orderdispatched.component';

describe('OrderdispatchedComponent', () => {
  let component: OrderdispatchedComponent;
  let fixture: ComponentFixture<OrderdispatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderdispatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdispatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
