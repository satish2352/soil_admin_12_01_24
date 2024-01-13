import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinciplelistComponent } from './principlelist.component';

describe('PrinciplelistComponent', () => {
  let component: PrinciplelistComponent;
  let fixture: ComponentFixture<PrinciplelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinciplelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinciplelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
