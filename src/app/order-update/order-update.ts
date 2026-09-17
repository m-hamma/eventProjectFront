import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { OrderService } from '../services/order';
import { Order } from '../models/order';
import { ProductService, Product } from '../services/product';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-order-update',
  standalone: true,
  imports: [
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './order-update.html',
})
export class OrderUpdate implements OnInit {
  customer = '';
  description = '';

  items: any[] = [];
  products: Product[] = [];
  id = 0;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    console.log('ID =', this.id);
    this.cdr.detectChanges();
    this.orderService.getOrder(this.id).subscribe((order) => {
      this.customer = order.customer;
      this.description = order.description ?? '';
      this.items = [...(order.items ?? [])];

      console.log('items=', this.items);

      this.cdr.detectChanges();
    });
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  update(): void {
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
      customer: this.customer,
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
  compareProducts(p1: Product | null, p2: Product | null): boolean {
    return p1?.id === p2?.id;
  }
  onProductChange(item: any): void {
    console.log('Produit sélectionné = ', item.product);

    if (item.product) {
      item.unitPrice = item.product.prix;
    }
  }
}
