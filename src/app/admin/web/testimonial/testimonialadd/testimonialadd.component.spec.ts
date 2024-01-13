import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialaddComponent } from './testimonialadd.component';

describe('TestimonialaddComponent', () => {
  let component: TestimonialaddComponent;
  let fixture: ComponentFixture<TestimonialaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
