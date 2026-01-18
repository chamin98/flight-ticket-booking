import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { Passenger } from './passenger.entity';

@Controller('passengers')
export class PassengersController {
    constructor(private readonly passengersService: PassengersService) { }

    @Get(':passportId')
    async findOne(@Param('passportId') passportId: string): Promise<Passenger> {
        const passenger = await this.passengersService.findOneByPassport(passportId);
        if (!passenger) {
            throw new NotFoundException(`Passenger with passport ID ${passportId} not found`);
        }
        return passenger;
    }

    @Post()
    create(@Body() passenger: Partial<Passenger>): Promise<Passenger> {
        return this.passengersService.create(passenger);
    }
}
