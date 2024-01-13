import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributortargetvideolistComponent } from './distributortargetvideolist.component';

describe('DistributortargetvideolistComponent', () => {
  let component: DistributortargetvideolistComponent;
  let fixture: ComponentFixture<DistributortargetvideolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributortargetvideolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributortargetvideolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
