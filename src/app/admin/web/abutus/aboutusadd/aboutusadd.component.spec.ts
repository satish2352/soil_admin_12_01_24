import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusaddComponent } from './aboutusadd.component';

describe('AboutusaddComponent', () => {
  let component: AboutusaddComponent;
  let fixture: ComponentFixture<AboutusaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutusaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
