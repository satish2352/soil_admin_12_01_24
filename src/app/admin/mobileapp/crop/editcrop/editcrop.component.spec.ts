import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcropComponent } from './editcrop.component';

describe('EditcropComponent', () => {
  let component: EditcropComponent;
  let fixture: ComponentFixture<EditcropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
