import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallaryphotolistComponent } from './gallaryphotolist.component';

describe('GallaryphotolistComponent', () => {
  let component: GallaryphotolistComponent;
  let fixture: ComponentFixture<GallaryphotolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallaryphotolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallaryphotolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
