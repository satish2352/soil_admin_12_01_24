import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterenshipupdateComponent } from './interenshipupdate.component';

describe('InterenshipupdateComponent', () => {
  let component: InterenshipupdateComponent;
  let fixture: ComponentFixture<InterenshipupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterenshipupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterenshipupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
