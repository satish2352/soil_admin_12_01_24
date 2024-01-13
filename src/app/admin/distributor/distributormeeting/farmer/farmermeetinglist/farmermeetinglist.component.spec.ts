import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmermeetinglistComponent } from './farmermeetinglist.component';

describe('FarmermeetinglistComponent', () => {
  let component: FarmermeetinglistComponent;
  let fixture: ComponentFixture<FarmermeetinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmermeetinglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmermeetinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
