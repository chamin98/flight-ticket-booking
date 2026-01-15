import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Prediction } from '../models/prediction.model';

@Injectable({
  providedIn: 'root',
})
export class PricePredictionService {
  private apiUrl = environment.apiEndpoint + 'flights';
  private http = inject(HttpClient);

  getPrediction(flightId: number): Observable<Prediction> {
    return this.http.get<Prediction>(`${this.apiUrl}/${flightId}/prediction`);
  }
}
