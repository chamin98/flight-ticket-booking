import { CabinClass } from 'src/common/enums';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Flight } from './flight.entity';

@Entity()
export class Fare {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Flight, (flight) => flight.id)
  flight: Flight;

  @Column()
  flightId: number;

  @Column({
    type: 'enum',
    enum: CabinClass,
  })
  class: CabinClass;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;
}
