import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseOrdersComponent } from './warehouse-orders.component';

describe('WarehouseOrdersComponent', () => {
  let component: WarehouseOrdersComponent;
  let fixture: ComponentFixture<WarehouseOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
