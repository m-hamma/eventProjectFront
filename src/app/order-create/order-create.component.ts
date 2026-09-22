import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { ClientService } from '../services/client.service';

import { Order } from '../models/order';
import { Client } from '../models/client';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.css',
})
export class OrderCreateComponent {
  description = '';

  items = [
    {
      product: null,
      quantity: 1,
      unitPrice: 0,
    },
  ];

  products: ProductService[] = [];

  clients: Client[] = [];

  client?: Client;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private clientService: ClientService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });

    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  save(): void {
    if (!this.client) {
      alert('Le client est obligatoire');
      return;
    }

    if (this.items.some((item) => !item.product)) {
      alert('Le produit est obligatoire');
      return;
    }

    if (this.items.some((item) => item.quantity <= 0)) {
      alert('La quantité doit être supérieure à 0');
      return;
    }

    const order: Order = {
      client: {
        id: this.client.id,
        code: this.client.code,
        nom: this.client.nom,
        email: this.client.email,
        telephone: this.client.telephone,
      },
      description: this.description,
      status: 'CREATED',
      items: this.items,
    };

    console.log('ORDER =', JSON.stringify(order, null, 2));
    this.orderService.createOrder(order).subscribe({
      next: () => {
        console.log('Commande créée');
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('Erreur création', err);
      },
    });
  }

  addItem(): void {
    this.items.push({
      product: null,
      quantity: 1,
      unitPrice: 0,
    });
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  onProductChange(item: any): void {
    if (item.product) {
      item.unitPrice = item.product.prix;
    }
  }
}
