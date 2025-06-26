// PAGES
import Error from '@/pages/Error/Error'

// COMPONENTS
import { Filter, FlightsTable, Title } from '@/components'

// HOOKS
import { useFlight } from './useFlight'

// CONSTANTS
import { FLIGHTS_TABLE_HEADS } from '@/constants'

// STYLES
import * as S from './styles'

export const Flights = () => {
  const { flights, isLoading, hasApiError, bookmarks, setBookmarks } =
    useFlight()

  return (
    <S.FlightsContainer>
      {!hasApiError ? (
        <>
          <Filter
            setFlights={() => {}}
            setHasErrorApi={() => {}}
            setIsLoading={() => {}}
          />
          <br />
          <FlightsTable
            heads={FLIGHTS_TABLE_HEADS}
            isLoading={isLoading}
            rows={flights}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        </>
      ) : (
        <Error pageOfError="Flights" />
      )}
    </S.FlightsContainer>
  )
}
