import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airport } from './airport.entity';

@Injectable()
export class AirportsService {
    constructor(
        @InjectRepository(Airport)
        private airportsRepository: Repository<Airport>,
    ) { }

    findAll(): Promise<Airport[]> {
        return this.airportsRepository.find();
    }
}
