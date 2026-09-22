import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api/referentiel/clients';

  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClient(id: number) {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }
}
