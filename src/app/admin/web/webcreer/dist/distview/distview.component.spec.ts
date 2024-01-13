import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistviewComponent } from './distview.component';

describe('DistviewComponent', () => {
  let component: DistviewComponent;
  let fixture: ComponentFixture<DistviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
