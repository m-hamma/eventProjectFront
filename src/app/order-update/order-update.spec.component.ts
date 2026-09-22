import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { OrderUpdateComponent } from './order-update.component';

describe('OrderUpdateComponent', () => {
  let component: OrderUpdateComponent;
  let fixture: ComponentFixture<OrderUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderUpdateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
