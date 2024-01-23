import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorlistnewComponent } from './distributorlistnew.component';

describe('DistributorlistnewComponent', () => {
  let component: DistributorlistnewComponent;
  let fixture: ComponentFixture<DistributorlistnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorlistnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorlistnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
