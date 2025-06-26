// COMPONENTS
import { Filter, FlightsList, GenericError, ScreenLoader } from '@/components'

// HOOKS
import { useFlight } from './useFlight'

// STYLES
import * as S from './styles'

export const Flights = () => {
  const { filteredFlights, hasApiError, isLoading, onFilter, onFilterReset } =
    useFlight()

  return (
    <S.FlightsContainer>
      {hasApiError && (
        <GenericError message="Ocorreu um erro ao carregar os voos." />
      )}

      <Filter onFilter={onFilter} onFilterReset={onFilterReset} />

      <FlightsList flights={filteredFlights} />

      {isLoading && <ScreenLoader />}
    </S.FlightsContainer>
  )
}
