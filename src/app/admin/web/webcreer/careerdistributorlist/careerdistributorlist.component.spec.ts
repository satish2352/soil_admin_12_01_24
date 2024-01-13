import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerdistributorlistComponent } from './careerdistributorlist.component';

describe('CareerdistributorlistComponent', () => {
  let component: CareerdistributorlistComponent;
  let fixture: ComponentFixture<CareerdistributorlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerdistributorlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerdistributorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
