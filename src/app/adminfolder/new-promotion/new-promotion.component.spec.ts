import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPromotionComponent } from './new-promotion.component';

describe('NewPromotionComponent', () => {
  let component: NewPromotionComponent;
  let fixture: ComponentFixture<NewPromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPromotionComponent]
    });
    fixture = TestBed.createComponent(NewPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
