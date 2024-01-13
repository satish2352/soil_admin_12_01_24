import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmeraddComponent } from './farmeradd.component';

describe('FarmeraddComponent', () => {
  let component: FarmeraddComponent;
  let fixture: ComponentFixture<FarmeraddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmeraddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmeraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
