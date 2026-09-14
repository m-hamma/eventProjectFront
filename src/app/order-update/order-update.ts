import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../services/order';
import { Order } from '../models/order';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-order-update',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './order-update.html',
})
export class OrderUpdate implements OnInit {
  customer = '';
  id: number = 0;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    console.log('ID =', this.id);

    this.orderService.getOrder(this.id).subscribe((order) => {
      console.log('ORDER =', order);

      this.customer = order.customer;

      console.log('CUSTOMER =', this.customer);

      this.cdr.detectChanges();
    });
  }

  update(): void {
    const order: Order = {
      id: this.id,
      customer: this.customer,
    };

    this.orderService.updateOrder(this.id, order).subscribe(() => {
      console.log('Commande mise à jour');

      window.location.href = '/';
    });
  }
}
