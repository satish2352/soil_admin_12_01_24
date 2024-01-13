import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlmlistComponent } from './mlmlist.component';

describe('MlmlistComponent', () => {
  let component: MlmlistComponent;
  let fixture: ComponentFixture<MlmlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlmlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlmlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
