import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Passenger {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    passportId: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    dateOfBirth: Date;
}
