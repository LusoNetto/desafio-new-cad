import { PaperPlaneTilt } from 'phosphor-react'

import { FlightCard } from './components'

import * as S from './styles'

import type { FlightsListProps } from './types'
import { useFlight } from '@/pages/Flights/useFlight'

export const FlightsList = (props: FlightsListProps) => {

  const {isBookmarked} = useFlight();

  const { flights } = props

  const hasFlights = flights.length > 0

  return (
    <S.FlightsListContainer>
      {hasFlights ? (
        flights.map((flight) => <FlightCard key={flight.flightNumber} flight={flight} isBookmarked={isBookmarked({flightId:flight.flightNumber})} />)
      ) : (
        <S.FlightsListEmpty>
          <PaperPlaneTilt size={48} />
          <S.Description>Nenhum voo encontrado.</S.Description>
        </S.FlightsListEmpty>
      )}
    </S.FlightsListContainer>
  )
}
