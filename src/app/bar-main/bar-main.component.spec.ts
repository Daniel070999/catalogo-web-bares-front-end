import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarMainComponent } from './bar-main.component';

describe('BarMainComponent', () => {
  let component: BarMainComponent;
  let fixture: ComponentFixture<BarMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarMainComponent]
    });
    fixture = TestBed.createComponent(BarMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
