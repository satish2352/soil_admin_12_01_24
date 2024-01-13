import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyprofilelistComponent } from './companyprofilelist.component';

describe('CompanyprofilelistComponent', () => {
  let component: CompanyprofilelistComponent;
  let fixture: ComponentFixture<CompanyprofilelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyprofilelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyprofilelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
