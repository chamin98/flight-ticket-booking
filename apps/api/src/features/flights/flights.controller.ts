import { Controller, Get, Param, Query } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { Flight } from './flight.entity';
import { FlightSeat } from './flight-seat.entity';
import { Fare } from './fare.entity';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get()
  findAll(): Promise<Flight[]> {
    return this.flightsService.findAll();
  }

  @Get('search')
  search(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
    @Query('date') date: string,
    @Query('originId') originId?: string,
    @Query('destinationId') destinationId?: string,
  ): Promise<Flight[]> {
    return this.flightsService.search(
      origin,
      destination,
      date,
      originId ? +originId : undefined,
      destinationId ? +destinationId : undefined,
    );
  }

  @Get('latest')
  getLatest(): Promise<Flight[]> {
    return this.flightsService.findLatest();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Flight | null> {
    return this.flightsService.findOne(+id);
  }

  @Get(':id/seats')
  getSeats(@Param('id') id: string): Promise<FlightSeat[]> {
    return this.flightsService.getSeats(+id);
  }

  @Get(':id/fares')
  getFares(@Param('id') id: string): Promise<Fare[]> {
    return this.flightsService.getFares(+id);
  }
}
