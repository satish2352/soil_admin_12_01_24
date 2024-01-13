import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorvisitComponent } from './distributorvisit.component';

describe('DistributorvisitComponent', () => {
  let component: DistributorvisitComponent;
  let fixture: ComponentFixture<DistributorvisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorvisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
