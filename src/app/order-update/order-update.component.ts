import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { ClientService } from '../services/client.service';
import { RouterLink } from '@angular/router';
import { Order } from '../models/order';
import { Client } from '../models/client';

@Component({
  selector: 'app-order-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,RouterLink,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './order-update.component.html',
})
export class OrderUpdateComponent implements OnInit {
  id = 0;

  description = '';

  items: any[] = [];

  products: ProductService[] = [];

  clients: Client[] = [];

  client?: Client;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });

    this.orderService.getOrder(this.id).subscribe((order) => {
      this.client = order.client;

      this.description = order.description ?? '';

      this.items = [...(order.items ?? [])];

      this.cdr.detectChanges();
    });

    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  update(): void {
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
      id: this.id,
      client: this.client,
      description: this.description,
      status: 'CREATED',
      items: this.items,
    };

    this.orderService.updateOrder(this.id, order).subscribe({
      next: () => {
        console.log('Commande mise à jour');
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('Erreur mise à jour', err);
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

  compareProducts(p1: ProductService | null, p2: ProductService | null): boolean {
    return p1?.id === p2?.id;
  }
  compareClients(c1: Client | null, c2: Client | null): boolean {
    return c1?.id === c2?.id;
  }
  onProductChange(item: any): void {
    if (item.product) {
      item.unitPrice = item.product.prix;
    }
  }
}
