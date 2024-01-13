import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributormeetinglistComponent } from './distributormeetinglist.component';

describe('DistributormeetinglistComponent', () => {
  let component: DistributormeetinglistComponent;
  let fixture: ComponentFixture<DistributormeetinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributormeetinglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributormeetinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
