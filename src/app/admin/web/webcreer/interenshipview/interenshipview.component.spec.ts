import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterenshipviewComponent } from './interenshipview.component';

describe('InterenshipviewComponent', () => {
  let component: InterenshipviewComponent;
  let fixture: ComponentFixture<InterenshipviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterenshipviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterenshipviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
