import type { RequestFlightDto } from '@/api'

export interface FlightCardProps {
  flight: RequestFlightDto
  isBookmarked?: boolean
}
