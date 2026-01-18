import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { BookingStatus } from 'src/common/enums';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
  ) {}

  findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find({
      relations: ['user', 'passenger', 'seat', 'fare'],
    });
  }

  findByUser(userId: number): Promise<Booking[]> {
    return this.bookingsRepository.find({
      where: { userId },
      relations: [
        'flight.departureAirport',
        'flight.arrivalAirport',
        'flight.plane',
        'passenger',
        'seat',
        'fare',
      ],
    });
  }

  findOne(id: number): Promise<Booking | null> {
    return this.bookingsRepository.findOne({
      where: { id },
      relations: ['flight', 'user', 'passenger', 'seat', 'fare'],
    });
  }

  create(booking: Partial<Booking>): Promise<Booking> {
    const newBooking = this.bookingsRepository.create({
      ...booking,
      bookingDate: new Date(),
      status: BookingStatus.CONFIRMED,
      pricePaid: 100, //TODO: Get fare amount
    });
    return this.bookingsRepository.save(newBooking);
  }

  async cancel(id: number): Promise<void> {
    await this.bookingsRepository.update(id, {
      status: BookingStatus.CANCELLED,
    });
  }
}
