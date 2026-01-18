import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Flight } from '../flights/flight.entity';
import { Passenger } from '../passengers/passenger.entity';
import { FlightSeat } from '../flights/flight-seat.entity';
import { Fare } from '../flights/fare.entity';
import { BookingStatus } from 'src/common/enums';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Passenger, (passenger) => passenger.id)
  passenger: Passenger;

  @Column()
  passengerId: number;

  @ManyToOne(() => Flight, (flight) => flight.id)
  flight: Flight;

  @Column()
  flightId: number;

  @ManyToOne(() => FlightSeat, (seat) => seat.id)
  seat: FlightSeat;

  @Column()
  seatId: number;

  @ManyToOne(() => Fare, (fare) => fare.id)
  fare: Fare;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column()
  fareId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  pricePaid: number;

  @Column()
  bookingDate: Date;
}
