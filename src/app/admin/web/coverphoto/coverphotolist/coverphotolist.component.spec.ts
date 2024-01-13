import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverphotolistComponent } from './coverphotolist.component';

describe('CoverphotolistComponent', () => {
  let component: CoverphotolistComponent;
  let fixture: ComponentFixture<CoverphotolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverphotolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverphotolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
