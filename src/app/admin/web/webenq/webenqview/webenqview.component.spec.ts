import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebenqviewComponent } from './webenqview.component';

describe('WebenqviewComponent', () => {
  let component: WebenqviewComponent;
  let fixture: ComponentFixture<WebenqviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebenqviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebenqviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
