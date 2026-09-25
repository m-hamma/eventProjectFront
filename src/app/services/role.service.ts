import { Role } from '../models/role';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageResponse } from '../models/page-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = 'http://localhost:8080/api/referentiel/roles';

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number) {
    return this.http.get<PageResponse<Role>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }
}
