import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloglistallviewComponent } from './bloglistallview.component';

describe('BloglistallviewComponent', () => {
  let component: BloglistallviewComponent;
  let fixture: ComponentFixture<BloglistallviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloglistallviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloglistallviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
