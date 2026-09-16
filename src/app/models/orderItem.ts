import { Product } from '../services/product';

export interface OrderItem {
  id?: number;
  product: Product | null;
  quantity: number;
  unitPrice: number;
}
