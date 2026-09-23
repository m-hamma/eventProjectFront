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
        localStorage.setItem('token', response.token);

        localStorage.setItem('userName', response.userName);

        localStorage.setItem('role', response.role);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');

    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  startTokenWatcher(): void {
    setInterval(() => {
      const token = this.getToken();

      if (!token) {
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));

        const expiration = payload.exp * 1000;

        if (Date.now() >= expiration) {
          this.logout();
        }
      } catch (error) {
        console.error('Token JWT invalide', error);

        this.logout();
      }
    }, 60000);
  }
  hasRole(role: string): boolean {
    return this.getRole() === role;
  }
}
