import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BSCStructureComponent } from './bscstructure.component';

describe('BSCStructureComponent', () => {
  let component: BSCStructureComponent;
  let fixture: ComponentFixture<BSCStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BSCStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BSCStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
