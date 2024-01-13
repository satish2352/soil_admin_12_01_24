import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorlistComponent } from './distributorlist.component';

describe('DistributorlistComponent', () => {
  let component: DistributorlistComponent;
  let fixture: ComponentFixture<DistributorlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
