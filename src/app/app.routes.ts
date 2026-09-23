import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderUpdateComponent } from './order-update/order-update.component';

import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { LoginComponent } from './auth/login/login.component';

import { authGuard } from './auth/guards/auth-guard';
import { SearchComponent } from './search/search.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full',
  },

  { path: 'login', component: LoginComponent },

  {
    path: 'accueil',
    component: HomeComponent,
    canActivate: [authGuard],
  },

  {
    path: 'search',
    component: SearchComponent,
    canActivate: [authGuard],
  },

  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [authGuard],
  },

  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard],
  },

  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [authGuard],
  },

  {
    path: 'create',
    component: OrderCreateComponent,
    canActivate: [authGuard],
  },

  {
    path: 'orders/update/:id',
    component: OrderUpdateComponent,
    canActivate: [authGuard],
  },
];
