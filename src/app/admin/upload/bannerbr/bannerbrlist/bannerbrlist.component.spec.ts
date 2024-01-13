import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerbrlistComponent } from './bannerbrlist.component';

describe('BannerbrlistComponent', () => {
  let component: BannerbrlistComponent;
  let fixture: ComponentFixture<BannerbrlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerbrlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerbrlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
