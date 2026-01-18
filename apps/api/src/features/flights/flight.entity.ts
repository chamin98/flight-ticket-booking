import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Airport } from '../airports/airport.entity';
import { Plane } from '../planes/plane.entity';
import { Fare } from './fare.entity';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => Plane, (plane) => plane.id)
  plane: Plane;

  @Column()
  planeId: number;

  @ManyToOne(() => Airport, (airport) => airport.id)
  departureAirport: Airport;

  @Column()
  departureAirportId: number;

  @ManyToOne(() => Airport, (airport) => airport.id)
  arrivalAirport: Airport;

  @Column()
  arrivalAirportId: number;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @OneToMany(() => Fare, (fare) => fare.flight)
  fares: Fare[];
}
