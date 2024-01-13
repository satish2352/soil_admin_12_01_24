import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamerviewComponent } from './famerview.component';

describe('FamerviewComponent', () => {
  let component: FamerviewComponent;
  let fixture: ComponentFixture<FamerviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamerviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
