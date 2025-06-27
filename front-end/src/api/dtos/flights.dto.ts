export type RequestFlightDto = {
  id: number
  flightNumber: number
  company: string
  origin: string
  destination: string
  price: string

  // YYYY-MM-DD
  departureDateTime: string

  // YYYY-MM-DD
  arrivalDateTime: string
}
