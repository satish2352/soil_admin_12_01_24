import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerbraddComponent } from './bannerbradd.component';

describe('BannerbraddComponent', () => {
  let component: BannerbraddComponent;
  let fixture: ComponentFixture<BannerbraddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerbraddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerbraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
