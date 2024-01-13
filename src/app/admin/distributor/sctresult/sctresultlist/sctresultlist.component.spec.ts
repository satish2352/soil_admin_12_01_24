import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SctresultlistComponent } from './sctresultlist.component';

describe('SctresultlistComponent', () => {
  let component: SctresultlistComponent;
  let fixture: ComponentFixture<SctresultlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SctresultlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SctresultlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
