import type { RequestFlightDto } from '@/api'

export interface FlightsListProps {
  flights: RequestFlightDto[]
  bookmarkedFlights: RequestFlightDto[]
  onToogleBookmarkFlight: (flightId: number) => void
}
