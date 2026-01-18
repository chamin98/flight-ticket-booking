import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airport } from './airport.entity';
import { AirportsController } from './airports.controller';
import { AirportsService } from './airports.service';

@Module({
    imports: [TypeOrmModule.forFeature([Airport])],
    controllers: [AirportsController],
    providers: [AirportsService],
    exports: [TypeOrmModule],
})
export class AirportsModule { }
