import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <a routerLink="/" class="logo"> FareWise </a>

        <nav class="nav-links">
          <a routerLink="/flight-search" routerLinkActive="active">Find Flights</a>
          @if (authService.isLoggedIn()) {
            <a routerLink="/bookings" routerLinkActive="active">My Bookings</a>
            <a routerLink="/profile" routerLinkActive="active">Profile</a>
          }
        </nav>

        <div class="auth-buttons">
          @if (authService.isLoggedIn()) {
            <span class="welcome-text">Hi, {{ authService.currentUser()?.firstName }}</span>
            <button (click)="authService.logout()" class="btn-outline">Logout</button>
          } @else {
            <a routerLink="/auth/login" class="btn-text">Login</a>
            <a routerLink="/auth/register" class="btn-primary">Register</a>
          }
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .header {
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        position: sticky;
        top: 0;
        z-index: 1000;
        padding: 1rem 0;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .logo {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1a1a1a;
        text-decoration: none;
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .nav-links {
        display: flex;
        gap: 2rem;
        align-items: center;

        a {
          text-decoration: none;
          color: #4b5563;
          font-weight: 500;
          transition: color 0.2s;
          font-size: 0.95rem;

          &:hover {
            color: #2563eb;
          }

          &.active {
            color: #2563eb;
          }
        }
      }

      .auth-buttons {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .welcome-text {
        color: #4b5563;
        font-size: 0.9rem;
        font-weight: 500;
      }

      .btn-text {
        text-decoration: none;
        color: #4b5563;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        transition: all 0.2s;

        &:hover {
          background-color: #f3f4f6;
          color: #1a1a1a;
        }
      }

      .btn-primary {
        text-decoration: none;
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
        color: white;
        padding: 0.5rem 1.25rem;
        border-radius: 0.5rem;
        font-weight: 500;
        transition: all 0.2s;
        box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
        }
      }

      .btn-outline {
        background: transparent;
        border: 1px solid #e5e7eb;
        color: #4b5563;
        padding: 0.5rem 1.25rem;
        border-radius: 0.5rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          border-color: #d1d5db;
          background-color: #f9fafb;
          color: #1a1a1a;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  authService = inject(AuthService);
}
