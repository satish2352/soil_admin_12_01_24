import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebenqlistComponent } from './webenqlist.component';

describe('WebenqlistComponent', () => {
  let component: WebenqlistComponent;
  let fixture: ComponentFixture<WebenqlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebenqlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebenqlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
