import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [],
    template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="brand">
            <span class="logo-text">FlightBooking</span>
            <p class="tagline">Your journey begins here.</p>
          </div>
          
          <div class="links">
            <div class="link-group">
              <h3>Company</h3>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Press</a>
            </div>
            <div class="link-group">
              <h3>Support</h3>
              <a href="#">Help Center</a>
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} FlightBooking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
      padding: 4rem 0 2rem;
      margin-top: auto;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3rem;
      flex-wrap: wrap;
      gap: 2rem;
    }

    .logo-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1e293b;
    }

    .tagline {
      color: #64748b;
      margin-top: 0.5rem;
    }

    .links {
      display: flex;
      gap: 4rem;
    }

    .link-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      h3 {
        font-size: 0.875rem;
        font-weight: 600;
        color: #1e293b;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.5rem;
      }

      a {
        text-decoration: none;
        color: #64748b;
        font-size: 0.9rem;
        transition: color 0.2s;

        &:hover {
          color: #2563eb;
        }
      }
    }

    .footer-bottom {
      border-top: 1px solid #e2e8f0;
      padding-top: 2rem;
      text-align: center;
      
      p {
        color: #94a3b8;
        font-size: 0.875rem;
      }
    }
  `]
})
export class FooterComponent {
    currentYear = new Date().getFullYear();
}
