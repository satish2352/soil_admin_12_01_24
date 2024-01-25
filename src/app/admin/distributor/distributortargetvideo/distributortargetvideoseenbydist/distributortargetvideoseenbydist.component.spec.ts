import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributortargetvideoseenbydistComponent } from './distributortargetvideoseenbydist.component';

describe('DistributortargetvideoseenbydistComponent', () => {
  let component: DistributortargetvideoseenbydistComponent;
  let fixture: ComponentFixture<DistributortargetvideoseenbydistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributortargetvideoseenbydistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributortargetvideoseenbydistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
