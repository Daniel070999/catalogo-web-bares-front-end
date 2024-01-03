import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPromotionComponent } from './view-promotion.component';

describe('ViewPromotionComponent', () => {
  let component: ViewPromotionComponent;
  let fixture: ComponentFixture<ViewPromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPromotionComponent]
    });
    fixture = TestBed.createComponent(ViewPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
