import { getAllFlights } from '../services/flights.service';

describe('Flights Service', () => {
  it('should return all flights as an array', () => {
    const flights = getAllFlights();
    expect(Array.isArray(flights)).toBe(true);
    expect(flights.length).toBeGreaterThan(0);
    flights.forEach(flight => {
      expect(typeof flight.id).toBe('number');
      expect(typeof flight.flightNumber).toBe('number');
      expect(typeof flight.company).toBe('string');
      expect(typeof flight.origin).toBe('string');
      expect(typeof flight.destination).toBe('string');
      expect(typeof flight.departureDateTime).toBe('string');
      expect(typeof flight.arrivalDateTime).toBe('string');
      expect(typeof flight.price).toBe('number');
    });
  });
});
