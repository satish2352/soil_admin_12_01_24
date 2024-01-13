import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterenshiplistComponent } from './interenshiplist.component';

describe('InterenshiplistComponent', () => {
  let component: InterenshiplistComponent;
  let fixture: ComponentFixture<InterenshiplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterenshiplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterenshiplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
