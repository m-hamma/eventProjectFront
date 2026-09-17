import { Routes } from '@angular/router';
import { Orders } from './orders/orders';
import { OrderCreate } from './order-create/order-create';
import { OrderUpdate } from './order-update/order-update';
import { Search } from './search/search';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'orders', component: Orders },
  { path: 'search', component: Search },
  { path: 'create', component: OrderCreate },
  { path: 'orders/update/:id', component: OrderUpdate },
];
