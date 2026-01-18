import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { Flight } from './flight.entity';
import { FlightSeat } from './flight-seat.entity';
import { Fare } from './fare.entity';
import { PricePredictionService } from './price-prediction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flight, FlightSeat, Fare]),
    HttpModule,
    ConfigModule,
  ],
  providers: [FlightsService, PricePredictionService],
  controllers: [FlightsController],
  exports: [FlightsService, PricePredictionService],
})
export class FlightsModule {}
