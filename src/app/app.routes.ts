import { Routes } from '@angular/router';
import { Orders } from './orders/orders';
import { OrderCreate } from './order-create/order-create';

export const routes: Routes = [
  { path: '', component: Orders },
  { path: 'create', component: OrderCreate },
];
