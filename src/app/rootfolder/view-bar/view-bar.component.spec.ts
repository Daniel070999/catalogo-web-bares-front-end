import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBarComponent } from './view-bar.component';

describe('ViewBarComponent', () => {
  let component: ViewBarComponent;
  let fixture: ComponentFixture<ViewBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBarComponent]
    });
    fixture = TestBed.createComponent(ViewBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
