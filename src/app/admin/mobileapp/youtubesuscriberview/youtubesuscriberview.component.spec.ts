import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubesuscriberviewComponent } from './youtubesuscriberview.component';

describe('YoutubesuscriberviewComponent', () => {
  let component: YoutubesuscriberviewComponent;
  let fixture: ComponentFixture<YoutubesuscriberviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubesuscriberviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubesuscriberviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
