// COMPONENTS
import { Filter, FlightsList, GenericError, ScreenLoader } from '@/components'

// HOOKS
import { useFlight } from './useFlight'

// STYLES
import * as S from './styles'

export const Flights = () => {
  const {
    filteredFlights,
    bookmarkedFlights,
    hasApiError,
    isLoading,
    onFilter,
    onFilterReset,
    onToogleBookmarkFlight,
  } = useFlight()

  return (
    <S.FlightsContainer>
      {hasApiError && (
        <GenericError message="Ocorreu um erro ao carregar os voos." />
      )}

      <Filter onFilter={onFilter} onFilterReset={onFilterReset} />

      <FlightsList
        flights={filteredFlights}
        bookmarkedFlights={bookmarkedFlights}
        onToogleBookmarkFlight={onToogleBookmarkFlight}
      />

      {isLoading && <ScreenLoader />}
    </S.FlightsContainer>
  )
}
