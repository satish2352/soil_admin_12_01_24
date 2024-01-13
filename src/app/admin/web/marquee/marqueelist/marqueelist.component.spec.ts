import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueelistComponent } from './marqueelist.component';

describe('MarqueelistComponent', () => {
  let component: MarqueelistComponent;
  let fixture: ComponentFixture<MarqueelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarqueelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarqueelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
