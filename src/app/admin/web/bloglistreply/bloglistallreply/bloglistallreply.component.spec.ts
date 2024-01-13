import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloglistallreplyComponent } from './bloglistallreply.component';

describe('BloglistallreplyComponent', () => {
  let component: BloglistallreplyComponent;
  let fixture: ComponentFixture<BloglistallreplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloglistallreplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloglistallreplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
