import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdernotdispatchedComponent } from './ordernotdispatched.component';

describe('OrdernotdispatchedComponent', () => {
  let component: OrdernotdispatchedComponent;
  let fixture: ComponentFixture<OrdernotdispatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdernotdispatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdernotdispatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
