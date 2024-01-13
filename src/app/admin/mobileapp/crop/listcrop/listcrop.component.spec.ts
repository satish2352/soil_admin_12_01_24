import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcropComponent } from './listcrop.component';

describe('ListcropComponent', () => {
  let component: ListcropComponent;
  let fixture: ComponentFixture<ListcropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
