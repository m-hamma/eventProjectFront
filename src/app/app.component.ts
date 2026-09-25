import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TranslatePipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem('lang') || 'fr';
    this.translate.use(lang);
  }
  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.hasRole('ADMIN');
  }

  getUserName(): string {
    return this.authService.getUserName() || '';
  }

}
