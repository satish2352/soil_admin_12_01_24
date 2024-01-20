import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageviewperticularComponent } from './messageviewperticular.component';

describe('MessageviewperticularComponent', () => {
  let component: MessageviewperticularComponent;
  let fixture: ComponentFixture<MessageviewperticularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageviewperticularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageviewperticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
