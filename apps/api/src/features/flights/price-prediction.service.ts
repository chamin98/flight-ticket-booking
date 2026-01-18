import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { ExternalApiRequest, PredictionResponse } from './dtos/prediction.dto';
import { Flight } from './flight.entity';

@Injectable()
export class PricePredictionService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getPrediction(flightId: number): Promise<PredictionResponse> {
    const flight = await this.flightRepository.findOne({
      where: { id: flightId },
      relations: ['departureAirport', 'arrivalAirport', 'plane', 'fares'],
    });

    if (!flight) {
      throw new NotFoundException(`Flight with ID ${flightId} not found`);
    }

    const payload = this.mapFlightToPayload(flight);
    const apiUrl = this.configService.get<string>('PRICE_PREDICTION_API_URL');

    if (!apiUrl) {
      console.warn(
        'PRICE_PREDICTION_API_URL is not set. Returning mock response.',
      );
      return {
        current_price: 7421.55,
        future_price_7d: 6899.12,
        recommendation: 'WAIT',
        threshold: '5%',
        model_version: 'mock_v1',
      };
    }

    try {
      const response = await lastValueFrom(
        this.httpService.post<PredictionResponse>(apiUrl, payload),
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching prediction:', error);
      throw error;
    }
  }

  private mapFlightToPayload(flight: Flight): ExternalApiRequest {
    const now = new Date();
    const departure = new Date(flight.departureTime);
    const diffTime = Math.abs(departure.getTime() - now.getTime());
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate duration in hours
    const arrival = new Date(flight.arrivalTime);
    const durationMs = arrival.getTime() - departure.getTime();
    const duration = parseFloat((durationMs / (1000 * 60 * 60)).toFixed(2));

    return {
      airline: flight.plane?.airline || 'Unknown',
      source_city: flight.departureAirport?.city || 'Unknown',
      destination_city: flight.arrivalAirport?.city || 'Unknown',
      stops: 'non-stop',
      class_type: 'Economy',
      duration: duration,
      days_left: daysLeft,
    };
  }
}
