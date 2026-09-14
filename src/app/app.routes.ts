import { Routes } from '@angular/router';
import { Orders } from './orders/orders';
import { OrderCreate } from './order-create/order-create';
import { OrderUpdate } from './order-update/order-update';

export const routes: Routes = [
  { path: '', component: Orders },
  { path: 'create', component: OrderCreate },
  {
    path: 'orders/update/:id',
    component: OrderUpdate,
  },
];
