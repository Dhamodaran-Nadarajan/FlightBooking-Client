export interface IScheduleAirlineData {
  airlineId: number;
  from: string;
  to: string;
  departure: Date;
  arrival: Date;
  businessSeats: number;
  nonBusinessSeats: number;
  ticketPrice: number;
  scheduledDays: string;
  meal: string;
}
