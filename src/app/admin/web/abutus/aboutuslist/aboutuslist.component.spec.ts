import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutuslistComponent } from './aboutuslist.component';

describe('AboutuslistComponent', () => {
  let component: AboutuslistComponent;
  let fixture: ComponentFixture<AboutuslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutuslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutuslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
