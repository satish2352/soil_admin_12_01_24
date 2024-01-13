import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionmissionlistComponent } from './visionmissionlist.component';

describe('VisionmissionlistComponent', () => {
  let component: VisionmissionlistComponent;
  let fixture: ComponentFixture<VisionmissionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionmissionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionmissionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
