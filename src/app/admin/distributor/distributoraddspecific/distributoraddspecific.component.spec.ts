import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributoraddspecificComponent } from './distributoraddspecific.component';

describe('DistributoraddspecificComponent', () => {
  let component: DistributoraddspecificComponent;
  let fixture: ComponentFixture<DistributoraddspecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributoraddspecificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributoraddspecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
