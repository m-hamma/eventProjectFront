import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/referentiel/users';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
