import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioaddComponent } from './audioadd.component';

describe('AudioaddComponent', () => {
  let component: AudioaddComponent;
  let fixture: ComponentFixture<AudioaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
