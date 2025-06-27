// COMPONENTS
import { Filter, FlightsList, GenericError, ScreenLoader } from '@/components'

// HOOKS
import {useBookmark} from "./useBookmark"

// STYLES
import * as S from './styles'

export const Bookmarks = () => {
  const { filteredFlights, hasApiError, isLoading, onFilter, onFilterReset } =
    useBookmark();

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
