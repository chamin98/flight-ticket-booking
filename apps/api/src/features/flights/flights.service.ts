import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan } from 'typeorm';
import { Flight } from './flight.entity';
import { FlightSeat } from './flight-seat.entity';
import { Fare } from './fare.entity';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private flightsRepository: Repository<Flight>,
    @InjectRepository(FlightSeat)
    private seatsRepository: Repository<FlightSeat>,
    @InjectRepository(Fare)
    private faresRepository: Repository<Fare>,
  ) {}

  findAll(): Promise<Flight[]> {
    return this.flightsRepository.find();
  }

  findOne(id: number): Promise<Flight | null> {
    return this.flightsRepository.findOneBy({ id });
  }

  async search(
    origin: string,
    destination: string,
    date: string,
    originId?: number,
    destinationId?: number,
  ): Promise<Flight[]> {
    const where: any = {};

    if (originId) {
      where.departureAirport = { id: originId };
    } else {
      where.departureAirport = { code: origin };
    }

    if (destinationId) {
      where.arrivalAirport = { id: destinationId };
    } else {
      where.arrivalAirport = { code: destination };
    }

    const searchDate = new Date(date);
    const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));

    where.departureTime = Between(startOfDay, endOfDay);

    return this.flightsRepository.find({
      where,
      relations: ['departureAirport', 'arrivalAirport', 'plane'],
    });
  }

  findLatest(): Promise<Flight[]> {
    return this.flightsRepository.find({
      where: { departureTime: MoreThan(new Date()) },
      order: { departureTime: 'ASC' },
      take: 3,
      relations: ['departureAirport', 'arrivalAirport', 'plane', 'fares'],
    });
  }

  create(flight: Flight): Promise<Flight> {
    return this.flightsRepository.save(flight);
  }

  getSeats(flightId: number): Promise<FlightSeat[]> {
    return this.seatsRepository.find({ where: { flightId } });
  }

  getFares(flightId: number): Promise<Fare[]> {
    return this.faresRepository.find({ where: { flightId } });
  }
}
