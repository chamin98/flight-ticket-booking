import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { Airport } from './features/airports/airport.entity';
import { AppModule } from './app.module';
import { CabinClass } from './common/enums';
import { Plane } from './features/planes/plane.entity';
import { Flight } from './features/flights/flight.entity';
import { Fare } from './features/flights/fare.entity';
import { FlightSeat } from './features/flights/flight-seat.entity';
import { PlaneSeat } from './features/planes/plane-seat.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const airportRepo = dataSource.getRepository(Airport);
  const planeRepo = dataSource.getRepository(Plane);
  const flightRepo = dataSource.getRepository(Flight);
  const flightSeatRepo = dataSource.getRepository(FlightSeat);
  const planeSeatRepo = dataSource.getRepository(PlaneSeat);
  const fareRepo = dataSource.getRepository(Fare);

  console.log('Seeding database...');

  // Create Airports
  const jfk = await airportRepo.save(
    airportRepo.create({
      code: 'JFK',
      name: 'John F. Kennedy International Airport',
      city: 'New York',
      country: 'USA',
    }),
  );

  const lhr = await airportRepo.save(
    airportRepo.create({
      code: 'LHR',
      name: 'Heathrow Airport',
      city: 'London',
      country: 'UK',
    }),
  );

  // Create Plane
  const plane = await planeRepo.save(
    planeRepo.create({
      code: 'TA-777',
      name: 'Boeing 777',
      airline: 'TechAir',
    }),
  );

  const planeSeat = await planeSeatRepo.save(
    planeSeatRepo.create({ plane, code: '1A' }),
  );

  // Create Flight
  const flight = await flightRepo.save(
    flightRepo.create({
      code: 'TA101',
      plane: plane,
      departureAirport: jfk,
      arrivalAirport: lhr,
      departureTime: new Date('2025-12-01T10:00:00Z'),
      arrivalTime: new Date('2025-12-01T18:00:00Z'),
    }),
  );

  await fareRepo.save(
    fareRepo.create({
      flight,
      class: CabinClass.ECONOMY,
      amount: 100.0,
    }),
  );

  // Create Flight Seats
  await flightSeatRepo.save(
    flightSeatRepo.create({
      flight,
      planeSeat,
    }),
  );

  console.log('Seeding complete!');
  await app.close();
}
void bootstrap();
