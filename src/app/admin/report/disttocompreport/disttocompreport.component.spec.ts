import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisttocompreportComponent } from './disttocompreport.component';

describe('DisttocompreportComponent', () => {
  let component: DisttocompreportComponent;
  let fixture: ComponentFixture<DisttocompreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisttocompreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisttocompreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
