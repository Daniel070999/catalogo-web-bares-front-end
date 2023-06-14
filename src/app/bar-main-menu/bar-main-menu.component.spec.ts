import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarMainMenuComponent } from './bar-main-menu.component';

describe('BarMainMenuComponent', () => {
  let component: BarMainMenuComponent;
  let fixture: ComponentFixture<BarMainMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarMainMenuComponent]
    });
    fixture = TestBed.createComponent(BarMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
