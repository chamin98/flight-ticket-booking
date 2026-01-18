import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Booking } from './booking.entity';
import { BookingsService } from './bookings.service';

@Controller('bookings')
@UseGuards(AuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  findAll(@Request() req): Promise<Booking[]> {
    // In a real app, admin might see all, users only see theirs
    // For now, let's return user's bookings
    return this.bookingsService.findByUser(req.user.sub);
  }

  @Post()
  create(@Body() booking: Partial<Booking>, @Request() req): Promise<Booking> {
    return this.bookingsService.create({
      ...booking,
      userId: req.user.sub,
    });
  }

  @Delete(':id')
  cancel(@Param('id') id: string): Promise<void> {
    return this.bookingsService.cancel(+id);
  }
}
