import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectselfComponent } from './redirectself.component';

describe('RedirectselfComponent', () => {
  let component: RedirectselfComponent;
  let fixture: ComponentFixture<RedirectselfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectselfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
