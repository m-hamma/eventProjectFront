import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  userName = '';
  password = '';

  login(): void {
    this.authService
      .login({
        userName: this.userName,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          console.log('Connecté', response);
          this.router.navigate(['/accueil']);
        },
        error: (error) => {
          console.error('Erreur de connexion', error);
        },
      });
  }
}
