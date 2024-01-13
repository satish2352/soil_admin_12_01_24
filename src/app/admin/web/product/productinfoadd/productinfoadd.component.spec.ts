import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductinfoaddComponent } from './productinfoadd.component';

describe('ProductinfoaddComponent', () => {
  let component: ProductinfoaddComponent;
  let fixture: ComponentFixture<ProductinfoaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductinfoaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductinfoaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
