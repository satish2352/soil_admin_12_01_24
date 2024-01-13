import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseOrderDetailsComponent } from './warehouse-order-details.component';

describe('WarehouseOrderDetailsComponent', () => {
  let component: WarehouseOrderDetailsComponent;
  let fixture: ComponentFixture<WarehouseOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
