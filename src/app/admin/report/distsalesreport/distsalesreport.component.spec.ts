import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistsalesreportComponent } from './distsalesreport.component';

describe('DistsalesreportComponent', () => {
  let component: DistsalesreportComponent;
  let fixture: ComponentFixture<DistsalesreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistsalesreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistsalesreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
