import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Flight } from './flight.entity';
import { PlaneSeat } from '../planes/plane-seat.entity';

@Entity()
export class FlightSeat {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Flight, (flight) => flight.id)
    flight: Flight;

    @Column()
    flightId: number;

    @ManyToOne(() => PlaneSeat, (planeSeat) => planeSeat.id)
    planeSeat: PlaneSeat;

    @Column()
    planeSeatId: number;

    @Column({ default: true })
    isAvailable: boolean;
}
