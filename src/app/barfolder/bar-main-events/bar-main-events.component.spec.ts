import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarMainEventsComponent } from './bar-main-events.component';

describe('BarMainEventsComponent', () => {
  let component: BarMainEventsComponent;
  let fixture: ComponentFixture<BarMainEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarMainEventsComponent]
    });
    fixture = TestBed.createComponent(BarMainEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
