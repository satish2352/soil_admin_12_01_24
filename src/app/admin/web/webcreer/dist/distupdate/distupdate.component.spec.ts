import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistupdateComponent } from './distupdate.component';

describe('DistupdateComponent', () => {
  let component: DistupdateComponent;
  let fixture: ComponentFixture<DistupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
