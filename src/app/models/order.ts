import { Client } from './client';
import { OrderItem } from './orderItem';
export interface Order {
  id?: number;
  client?: Client;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  items?: OrderItem[];
}
