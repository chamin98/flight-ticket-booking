import { Controller, Get } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { Airport } from './airport.entity';

@Controller('airports')
export class AirportsController {
    constructor(private readonly airportsService: AirportsService) { }

    @Get()
    findAll(): Promise<Airport[]> {
        return this.airportsService.findAll();
    }
}
