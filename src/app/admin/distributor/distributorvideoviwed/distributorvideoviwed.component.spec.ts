import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorvideoviwedComponent } from './distributorvideoviwed.component';

describe('DistributorvideoviwedComponent', () => {
  let component: DistributorvideoviwedComponent;
  let fixture: ComponentFixture<DistributorvideoviwedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorvideoviwedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorvideoviwedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
