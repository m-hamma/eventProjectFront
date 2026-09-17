import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Order } from '../models/order';
import { MatCardModule } from '@angular/material/card';
import { OrderService } from '../services/order';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-orders',
  imports: [
    MatButtonModule,CommonModule,
    RouterLink,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  commandes: Order[] = [];

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        console.log('data avant', data);

        this.commandes = [...data];

        this.cdr.detectChanges();

        console.log('data apres', this.commandes);
      },
    });
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
}
