import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotvisitaddComponent } from './plotvisitadd.component';

describe('PlotvisitaddComponent', () => {
  let component: PlotvisitaddComponent;
  let fixture: ComponentFixture<PlotvisitaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotvisitaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotvisitaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
