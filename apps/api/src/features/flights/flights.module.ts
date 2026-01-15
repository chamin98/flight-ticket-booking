import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { Flight } from './flight.entity';
import { FlightSeat } from './flight-seat.entity';
import { Fare } from './fare.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Flight, FlightSeat, Fare])],
    providers: [FlightsService],
    controllers: [FlightsController],
    exports: [FlightsService]
})
export class FlightsModule { }
