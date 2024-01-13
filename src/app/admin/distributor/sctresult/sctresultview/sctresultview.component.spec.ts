import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SctresultviewComponent } from './sctresultview.component';

describe('SctresultviewComponent', () => {
  let component: SctresultviewComponent;
  let fixture: ComponentFixture<SctresultviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SctresultviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SctresultviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
