import flights from '../utils/flights.json';

export interface FlightDto {
  id: number;
  flightNumber: number;
  company: string;
  origin: string;
  destination: string;
  departureDateTime: string;
  arrivalDateTime: string;
  price: number;
}

interface FlightFilter {
  origin?: string;
  destination?: string;
  date?: string;
}

export const getAllFlights = (filter?: FlightFilter): FlightDto[] => {
  let result: FlightDto[] = flights;
  if (filter) {
    if (filter.origin) {
      result = result.filter(f => f.origin === filter.origin);
    }
    if (filter.destination) {
      result = result.filter(f => f.destination === filter.destination);
    }
    if (filter.date) {
      result = result.filter(f => f.departureDateTime === filter.date);
    }
  }
  return result;
};
