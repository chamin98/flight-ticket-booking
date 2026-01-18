import { Airport } from './airport-model';
import { Plane } from './plane-model';
import { Fare } from './fare.model';

export interface Flight {
  id: number;
  code: string;
  plane: Plane;
  planeId: number;
  departureAirport: Airport;
  departureAirportId: number;
  arrivalAirport: Airport;
  arrivalAirportId: number;
  departureTime: Date;
  arrivalTime: Date;
  fares: Fare[];
}
