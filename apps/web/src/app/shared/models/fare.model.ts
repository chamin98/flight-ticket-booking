import { Flight } from './flight.model';

export interface Fare {
  id: number;
  flightId: number;
  class: string;
  amount: number;
}

export interface FareEntity extends Fare {
  flight: Flight;
}
