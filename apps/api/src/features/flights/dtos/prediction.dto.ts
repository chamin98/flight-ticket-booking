export interface ExternalApiRequest {
  airline: string;
  source_city: string;
  destination_city: string;
  stops: string;
  class_type: string;
  duration: number;
  days_left: number;
}

export interface PredictionResponse {
  current_price: number;
  future_price_7d: number;
  recommendation: 'BUY' | 'WAIT' | 'STABLE';
  threshold: string;
  model_version: string;
}
