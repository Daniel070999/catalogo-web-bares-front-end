import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBarRootComponent } from './admin-bar-root.component';

describe('AdminBarRootComponent', () => {
  let component: AdminBarRootComponent;
  let fixture: ComponentFixture<AdminBarRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBarRootComponent]
    });
    fixture = TestBed.createComponent(AdminBarRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
