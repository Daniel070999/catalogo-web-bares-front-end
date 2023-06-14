import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarMainPromotionsComponent } from './bar-main-promotions.component';

describe('BarMainPromotionsComponent', () => {
  let component: BarMainPromotionsComponent;
  let fixture: ComponentFixture<BarMainPromotionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarMainPromotionsComponent]
    });
    fixture = TestBed.createComponent(BarMainPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
