import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareeraddComponent } from './careeradd.component';

describe('CareeraddComponent', () => {
  let component: CareeraddComponent;
  let fixture: ComponentFixture<CareeraddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareeraddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareeraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
