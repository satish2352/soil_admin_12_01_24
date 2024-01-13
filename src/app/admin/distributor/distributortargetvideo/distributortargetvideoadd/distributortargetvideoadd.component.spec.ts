import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributortargetvideoaddComponent } from './distributortargetvideoadd.component';

describe('DistributortargetvideoaddComponent', () => {
  let component: DistributortargetvideoaddComponent;
  let fixture: ComponentFixture<DistributortargetvideoaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributortargetvideoaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributortargetvideoaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
