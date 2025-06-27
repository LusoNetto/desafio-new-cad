import { AirplaneTakeoff, Star } from 'phosphor-react'
import { useTheme } from 'styled-components'

import { formatters } from '@/utils'

import * as S from './styles'

import type { FlightCardProps } from './types'
import { useFlight } from '@/pages/Flights/useFlight'

export const FlightCard = (props: FlightCardProps) => {
  const { flight, isBookmarked } = props

  const { toogleBookmarkFlight } = useFlight();

  const { COLORS } = useTheme()

  const departureDate = formatters.formatDateToBrazilian(
    flight.departureDateTime,
  )
  const arrivalDate = formatters.formatDateToBrazilian(flight.arrivalDateTime)

  const price = formatters.formatPriceToBrazilianCurrency(Number(flight.price))

  return (
    <S.FlightCardContainer>
      <S.ContentContainer>
        <S.Label>Origem</S.Label>
        <S.Value>{flight.origin}</S.Value>
      </S.ContentContainer>

      <S.FlightIconContainer>
        <AirplaneTakeoff size={24} weight="fill" color={COLORS.NEUTRAL_500} />
      </S.FlightIconContainer>

      <S.ContentContainer>
        <S.Label>Destino</S.Label>
        <S.Value>{flight.destination}</S.Value>
      </S.ContentContainer>

      <S.ContentContainer>
        <S.Label>Companhia</S.Label>
        <S.Value>{flight.company}</S.Value>
      </S.ContentContainer>

      <S.ContentContainer align="center">
        <S.Label>Data de Partida</S.Label>
        <S.Value>{departureDate}</S.Value>
      </S.ContentContainer>

      <S.ContentContainer align="center">
        <S.Label>Data de Chegada</S.Label>
        <S.Value>{arrivalDate}</S.Value>
      </S.ContentContainer>

      <S.ContentContainer align="center">
        <S.Label>Preço</S.Label>
        <S.Value>{price}</S.Value>
      </S.ContentContainer>

      <S.BookmarkButton>
        <Star
          onClick={() => toogleBookmarkFlight({flightId: flight.flightNumber})}
          size={24}
          weight={isBookmarked ? 'fill' : 'regular'}
          color={isBookmarked ? COLORS.WARNING_MAIN : COLORS.NEUTRAL_500}
        />
      </S.BookmarkButton>
    </S.FlightCardContainer>
  )
}
