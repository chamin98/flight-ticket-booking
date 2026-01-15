import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from './passenger.entity';

@Injectable()
export class PassengersService {
    constructor(
        @InjectRepository(Passenger)
        private passengersRepository: Repository<Passenger>,
    ) { }

    findOneByPassport(passportId: string): Promise<Passenger | null> {
        return this.passengersRepository.findOne({ where: { passportId } });
    }

    create(passenger: Partial<Passenger>): Promise<Passenger> {
        const newPassenger = this.passengersRepository.create(passenger);
        return this.passengersRepository.save(newPassenger);
    }
}
