import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyprofileaddComponent } from './companyprofileadd.component';

describe('CompanyprofileaddComponent', () => {
  let component: CompanyprofileaddComponent;
  let fixture: ComponentFixture<CompanyprofileaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyprofileaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyprofileaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
