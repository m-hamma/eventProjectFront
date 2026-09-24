import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { LoginRequest } from '../models/login-request';
import { AuthResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly API_URL = 'http://localhost:8080/api/auth';

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, request).pipe(
      tap((response) => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userName', response.userName);
        sessionStorage.setItem('role', response.role);
      }),
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('role');

    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return Date.now() < payload.exp * 1000;
    } catch {
      return false;
    }
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getUserName(): string | null {
    return sessionStorage.getItem('userName');
  }

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  startTokenWatcher(): void {
    setInterval(() => {
      if (!this.isAuthenticated()) {
        this.logout();
      }
    }, 60000);
  }

  hasRole(role: string): boolean {
    return this.getRole() === role;
  }
}
