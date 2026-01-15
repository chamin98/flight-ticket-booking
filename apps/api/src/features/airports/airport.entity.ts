import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Airport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    code: string; // e.g., JFK

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    country: string;
}
