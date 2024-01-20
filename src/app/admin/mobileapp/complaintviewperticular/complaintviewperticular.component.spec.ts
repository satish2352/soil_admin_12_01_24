import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintviewperticularComponent } from './complaintviewperticular.component';

describe('ComplaintviewperticularComponent', () => {
  let component: ComplaintviewperticularComponent;
  let fixture: ComponentFixture<ComplaintviewperticularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintviewperticularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintviewperticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
