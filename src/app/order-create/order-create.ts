import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../services/order';

@Component({
  selector: 'app-order-create',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './order-create.html',
  styleUrl: './order-create.css',
})
export class OrderCreate {
  customer = '';
  constructor(private orderService: OrderService) {}
  save(): void {
    const order = {
      customer: this.customer,
    };

    this.orderService.createOrder(order as any).subscribe(() => {
      console.log('Commande créée');
    });
  }
}
