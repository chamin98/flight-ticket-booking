export interface Prediction {
  current_price: number;
  future_price_7d: number;
  recommendation: 'BUY' | 'WAIT' | 'STABLE';
  threshold: string;
  model_version: string;
}
