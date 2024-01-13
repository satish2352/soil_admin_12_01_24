import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverphotoaddComponent } from './coverphotoadd.component';

describe('CoverphotoaddComponent', () => {
  let component: CoverphotoaddComponent;
  let fixture: ComponentFixture<CoverphotoaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverphotoaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverphotoaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
