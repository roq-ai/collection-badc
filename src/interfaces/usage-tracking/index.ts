import { VehicleInterface } from 'interfaces/vehicle';
import { GetQueryInterface } from 'interfaces';

export interface UsageTrackingInterface {
  id?: string;
  date: any;
  mileage: number;
  fuel_consumption: number;
  vehicle_id: string;
  created_at?: any;
  updated_at?: any;

  vehicle?: VehicleInterface;
  _count?: {};
}

export interface UsageTrackingGetQueryInterface extends GetQueryInterface {
  id?: string;
  vehicle_id?: string;
}
