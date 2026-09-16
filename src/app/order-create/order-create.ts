import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../services/order';
import { Order } from '../models/order';
import { ProductService, Product } from '../services/product';
import { MatSelectModule } from '@angular/material/select';

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
  templateUrl: './order-create.html',
  styleUrl: './order-create.css',
})
export class OrderCreate {
  customer = '';
  description = '';
  items = [
    {
      product: null,
      quantity: 1,
      unitPrice: 0,
    },
  ];
  products: Product[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }

  save(): void {
    if (this.items.some((item) => !item.product)) {
      alert('Le produit est obligatoire');
      return;
    }
    if (this.items.some((item) => item.quantity <= 0)) {
      alert('La quantité doit être supérieure à 0');
      return;
    }
    const order: Order = {
      customer: this.customer,
      description: this.description,
      status: 'CREATED',
      items: this.items,
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        console.log('Commande créée');
        this.router.navigate(['/']);
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
    console.log('Produit sélectionné = ', item.product);

    if (item.product) {
      item.unitPrice = item.product.prix;
    }
  }
}
