import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductinfolistComponent } from './productinfolist.component';

describe('ProductinfolistComponent', () => {
  let component: ProductinfolistComponent;
  let fixture: ComponentFixture<ProductinfolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductinfolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductinfolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
