import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobupdateComponent } from './jobupdate.component';

describe('JobupdateComponent', () => {
  let component: JobupdateComponent;
  let fixture: ComponentFixture<JobupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
