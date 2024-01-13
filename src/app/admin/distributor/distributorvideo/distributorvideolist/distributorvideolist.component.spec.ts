import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorvideolistComponent } from './distributorvideolist.component';

describe('DistributorvideolistComponent', () => {
  let component: DistributorvideolistComponent;
  let fixture: ComponentFixture<DistributorvideolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorvideolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorvideolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
