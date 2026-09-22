import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { SearchComponent } from './search/search.component';

import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'orders', component: OrdersComponent },
  { path: 'search', component: SearchComponent },
  { path: 'create', component: OrderCreateComponent },
  { path: 'orders/update/:id', component: OrderUpdateComponent },

  { path: 'users', component: UsersComponent },
  { path: 'roles', component: RolesComponent },
];
