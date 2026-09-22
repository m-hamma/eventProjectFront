import { Role } from '../models/role';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = 'http://localhost:8080/api/referentiel/roles';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Role[]>(this.apiUrl);
  }
}
