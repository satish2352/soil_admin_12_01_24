import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistupdatenewComponent } from './distupdatenew.component';

describe('DistupdatenewComponent', () => {
  let component: DistupdatenewComponent;
  let fixture: ComponentFixture<DistupdatenewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistupdatenewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistupdatenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
