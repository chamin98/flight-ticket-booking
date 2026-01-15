import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plane } from './plane.entity';
import { PlaneSeat } from './plane-seat.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Plane, PlaneSeat])],
    exports: [TypeOrmModule],
})
export class PlanesModule { }
