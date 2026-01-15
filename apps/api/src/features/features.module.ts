import { Module } from '@nestjs/common';
import { AirportsModule } from './airports/airports.module';
import { BookingsModule } from './bookings/bookings.module';
import { FlightsModule } from './flights/flights.module';
import { PassengersModule } from './passengers/passengers.module';
import { PlanesModule } from './planes/planes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    FlightsModule,
    BookingsModule,
    AirportsModule,
    PlanesModule,
    PassengersModule,
  ],
  exports: [
    UsersModule,
    FlightsModule,
    BookingsModule,
    AirportsModule,
    PlanesModule,
    PassengersModule,
  ],
})
export class FeaturesModule {}
