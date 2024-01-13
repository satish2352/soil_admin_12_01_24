import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionmissionaddComponent } from './visionmissionadd.component';

describe('VisionmissionaddComponent', () => {
  let component: VisionmissionaddComponent;
  let fixture: ComponentFixture<VisionmissionaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionmissionaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionmissionaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
