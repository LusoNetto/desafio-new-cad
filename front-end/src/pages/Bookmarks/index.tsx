// COMPONENTS
import { Filter, FlightsList, GenericError, ScreenLoader } from '@/components'

// HOOKS
import { useFlight } from '../Flights/useFlight'

// STYLES
import * as S from './styles'

export const Bookmarks = () => {
  const {
    hasApiError,
    isLoading,
    bookmarkedFlights,
    filteredBookmarkedFlights,
    filterBookmarkedFlights,
    onBookmarksFilterReset,
    onToogleBookmarkFlight,
  } = useFlight()

  return (
    <S.FlightsContainer>
      {hasApiError && (
        <GenericError message="Ocorreu um erro ao carregar os voos." />
      )}

      <Filter onFilter={filterBookmarkedFlights} onFilterReset={onBookmarksFilterReset} />

      <FlightsList
        flights={filteredBookmarkedFlights}
        bookmarkedFlights={bookmarkedFlights}
        onToogleBookmarkFlight={onToogleBookmarkFlight}
      />

      {isLoading && <ScreenLoader />}
    </S.FlightsContainer>
  )
}
