import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotvisitlistComponent } from './plotvisitlist.component';

describe('PlotvisitlistComponent', () => {
  let component: PlotvisitlistComponent;
  let fixture: ComponentFixture<PlotvisitlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotvisitlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotvisitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
