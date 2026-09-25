import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { PageResponse } from '../models/page-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/referentiel/users';

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number) {
    return this.http.get<PageResponse<User>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }
}
