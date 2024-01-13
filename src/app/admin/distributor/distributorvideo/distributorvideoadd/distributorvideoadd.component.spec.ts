import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorvideoaddComponent } from './distributorvideoadd.component';

describe('DistributorvideoaddComponent', () => {
  let component: DistributorvideoaddComponent;
  let fixture: ComponentFixture<DistributorvideoaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorvideoaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorvideoaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
