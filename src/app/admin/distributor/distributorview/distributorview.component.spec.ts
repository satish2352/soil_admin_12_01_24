import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorviewComponent } from './distributorview.component';

describe('DistributorviewComponent', () => {
  let component: DistributorviewComponent;
  let fixture: ComponentFixture<DistributorviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
