import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductService {
  id: number;
  code: string;
  libelle: string;
  prix: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/referentiel/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductService[]> {
    return this.http.get<ProductService[]>(this.apiUrl);
  }
}
