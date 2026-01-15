import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Fare } from '../models/fare.model';
import { FlightSeat } from '../models/flight-seat.model';
import { Flight } from '../models/flight.model';
import { Airport } from '../models/airport-model';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private apiUrl = environment.apiEndpoint + 'flights';
  private http = inject(HttpClient);

  searchFlights(
    origin: string,
    destination: string,
    date: Date,
    originId?: number,
    destinationId?: number,
  ): Observable<Flight[]> {
    let params = new HttpParams()
      .set('origin', origin)
      .set('destination', destination)
      .set('date', date.toISOString());

    if (originId) {
      params = params.set('originId', originId.toString());
    }
    if (destinationId) {
      params = params.set('destinationId', destinationId.toString());
    }

    return this.http.get<Flight[]>(`${this.apiUrl}/search`, { params });
  }

  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${environment.apiEndpoint}airports`);
  }

  getLatestFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.apiUrl}/latest`);
  }

  getFlightById(id: string): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/${id}`);
  }

  getSeats(flightId: string): Observable<FlightSeat[]> {
    return this.http.get<FlightSeat[]>(`${this.apiUrl}/${flightId}/seats`);
  }

  getFares(flightId: string): Observable<Fare[]> {
    return this.http.get<Fare[]>(`${this.apiUrl}/${flightId}/fares`);
  }
}
