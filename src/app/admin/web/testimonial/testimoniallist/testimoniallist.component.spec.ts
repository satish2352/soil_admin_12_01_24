import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimoniallistComponent } from './testimoniallist.component';

describe('TestimoniallistComponent', () => {
  let component: TestimoniallistComponent;
  let fixture: ComponentFixture<TestimoniallistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimoniallistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimoniallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
