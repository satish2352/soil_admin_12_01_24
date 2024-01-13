import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallaryphotoaddComponent } from './gallaryphotoadd.component';

describe('GallaryphotoaddComponent', () => {
  let component: GallaryphotoaddComponent;
  let fixture: ComponentFixture<GallaryphotoaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallaryphotoaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallaryphotoaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
