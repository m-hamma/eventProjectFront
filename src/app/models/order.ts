import { OrderItem } from './orderItem';

export interface Order {
  id?: number;
  customer: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  items?: OrderItem[];
}
