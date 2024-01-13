import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountaddComponent } from './countadd.component';

describe('CountaddComponent', () => {
  let component: CountaddComponent;
  let fixture: ComponentFixture<CountaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
