import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Order } from '../models/order';
import { MatCardModule } from '@angular/material/card';
import { OrderService } from '../services/order.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { NgClass } from '@angular/common';
import { MatPaginatorModule,PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-orders',
  imports: [
    MatButtonModule,MatPaginatorModule,
    NgClass,
    CommonModule,
    MatChipsModule,
    RouterLink,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  commandes: Order[] = [];
  totalElements = 0;
  pageIndex = 0;
  pageSize = 5;
  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log('NGONINIT');
    this.loadOrders();
  }

  delete(id: number): void {
    const confirmation = confirm('Voulez-vous vraiment supprimer cette commande ?');

    if (!confirmation) {
      return;
    }

    this.orderService.deleteOrder(id).subscribe({
      next: () => {
        this.commandes = this.commandes.filter((order) => order.id !== id);

        console.log('Commande supprimée');
      },
      error: () => {
        alert('Impossible de supprimer cette commande car une facture lui est associée.');
      },
    });
  }
  getTotal(order: any): number {
    if (!order.items) {
      return 0;
    }

    return order.items.reduce(
      (total: number, item: any) => total + item.quantity * item.unitPrice,
      0,
    );
  }
  loadOrders(): void {
    console.log('LOAD ORDERS');
    this.orderService.getOrders(this.pageIndex, this.pageSize).subscribe({
      next: (data: any) => {
        console.log('DATA', data);

        this.commandes = data.content;
        this.totalElements = data.totalElements;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('ERROR', err);
      },
    });
  }
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.loadOrders();
  }
}
