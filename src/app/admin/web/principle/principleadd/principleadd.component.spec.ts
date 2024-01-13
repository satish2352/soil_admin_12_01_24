import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipleaddComponent } from './principleadd.component';

describe('PrincipleaddComponent', () => {
  let component: PrincipleaddComponent;
  let fixture: ComponentFixture<PrincipleaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipleaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipleaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
