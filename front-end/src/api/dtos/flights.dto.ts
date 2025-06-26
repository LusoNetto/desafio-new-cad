export type RequestFlightsDto = {
  id: number
  flightNumber: number
  company: string
  origin: string
  destination: string
  departureDateTime: Date
  arrivalDateTime: Date
  price: string
}
