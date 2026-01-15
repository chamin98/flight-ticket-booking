import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { AsyncPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { FlightService } from '../../services/flight.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MatButton, AsyncPipe, DatePipe, CurrencyPipe],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  private router = inject(Router);
  private flightService = inject(FlightService);

  featuredFlights$ = this.flightService.getLatestFlights().pipe(
    map((flights) =>
      flights.map((f) => ({
        id: f.id,
        airline: f.plane.airline,
        from: f.departureAirport.code,
        to: f.arrivalAirport.code,
        price: f.fares?.length ? Math.min(...f.fares.map((fare) => fare.amount)) : 0,
        depart: f.departureTime,
      })),
    ),
  );

  viewDetails(id: number | string) {
    this.router.navigate(['/flight-details', id]);
  }
}
