import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plane {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    code: string;

    @Column()
    name: string;

    @Column()
    airline: string;
}
