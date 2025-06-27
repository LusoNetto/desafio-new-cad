import { PaperPlaneTilt } from 'phosphor-react'

import type { RequestFlightDto } from '@/api'

import { FlightCard } from './components'

import * as S from './styles'

import type { FlightsListProps } from './types'

export const FlightsList = (props: FlightsListProps) => {
  const { flights, bookmarkedFlights, onToogleBookmarkFlight } = props

  const hasFlights = flights.length > 0

  const isFlightBookmarked = (flight: RequestFlightDto) => {
    return bookmarkedFlights.some(
      (bookmarkedFlight) => bookmarkedFlight.id === flight.id,
    )
  }

  return (
    <S.FlightsListContainer>
      {hasFlights ? (
        flights.map((flight) => (
          <FlightCard
            key={flight.flightNumber}
            flight={flight}
            isBookmarked={isFlightBookmarked(flight)}
            onToogleBookmarkFlight={onToogleBookmarkFlight}
          />
        ))
      ) : (
        <S.FlightsListEmpty>
          <PaperPlaneTilt size={48} />
          <S.Description>Nenhum voo encontrado.</S.Description>
        </S.FlightsListEmpty>
      )}
    </S.FlightsListContainer>
  )
}
