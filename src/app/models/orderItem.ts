import { ProductService } from '../services/product.service';

export interface OrderItem {
  id?: number;
  product: ProductService | null;
  quantity: number;
  unitPrice: number;
}
