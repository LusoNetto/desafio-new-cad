// HOOKS
import { useCallback, useEffect, useState } from 'react'

// SERVICES
import { FlightsService, BookmarksService } from '@/api'

// TYPES
import type { RequestFlightDto } from '@/api'

type FilterFormData = {
  origin: string
  destination: string
  departure: string
  arrival: string
  search?: string
}

export const useFlight = () => {
  const [filteredFlights, setFilteredFlights] = useState<RequestFlightDto[]>([])
  const [flights, setFlights] = useState<RequestFlightDto[]>([])
  const [bookmarkedFlights, setBookmarkedFlights] = useState<
    RequestFlightDto[]
  >([])
  const [filter, setFilter] = useState<FilterFormData>({
    origin: '',
    destination: '',
    departure: '',
    arrival: '',
    search: '',
  })
  const [hasApiError, setHasApiError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [filteredBookmarkedFlights, setFilteredBookmarkedFlights] = useState<RequestFlightDto[]>([])

  const handleError = (error: unknown) => {
    console.error('Error:', error)
    setHasApiError(true)
  }

  const getFlights = useCallback(async () => {
    try {
      setIsLoading(true)
      const flights = await FlightsService.getFlights()
      setFlights(flights)
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const BOOKMARKS_KEY = 'bookmarkedFlightsIds';

  function saveBookmarksToStorage(ids: number[]) {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
  }

  function getBookmarksFromStorage(): number[] {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  const getBookmarks = useCallback(async () => {
    try {
      const { flightIds = [] } = await BookmarksService.getBookmarks();

      saveBookmarksToStorage(flightIds);
      const bookmarkedFlights = flights.filter((flight) =>
        flightIds.includes(flight.id),
      )

      setBookmarkedFlights(bookmarkedFlights)
    } catch (error) {
      handleError(error)
    }
  }, [flights])

  const updateBookmarks = useCallback(
    (flight: RequestFlightDto, isAdding: boolean) => {
      setBookmarkedFlights((prev) => {
        const updated = isAdding
          ? [...prev, flight]
          : prev.filter((bookmarked) => bookmarked.id !== flight.id);

        saveBookmarksToStorage(updated.map(f => f.id));

        return updated;
      })
    },
    [],
  )

  const toggleBookmark = async (flightId: number) => {
    try {
      setIsLoading(true)

      const flight = flights.find((f) => f.id === flightId)

      if (!flight) throw new Error('Voo não encontrado')

      const isBookmarked = bookmarkedFlights.some((f) => f.id === flightId)

      if (isBookmarked) {
        await BookmarksService.deleteBookmarks({ flightId })
      } else {
        await BookmarksService.postBookmarks({ flightId })
      }

      updateBookmarks(flight, !isBookmarked)
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onFilter = (data: FilterFormData) => setFilter(data)

  const onFilterReset = () =>
    setFilter({ origin: '', destination: '', departure: '', arrival: '', search: '' })

  const filterFlights = useCallback(() => {
    const hasActiveFilters = Object.values(filter).some(Boolean)

    if (!hasActiveFilters) {
      setFilteredFlights(flights)
      return
    }

    const filtered = flights.filter(
      (flight) =>
        (!filter.origin || flight.origin === filter.origin) &&
        (!filter.destination || flight.destination === filter.destination) &&
        (!filter.departure || flight.departureDateTime === filter.departure) &&
        (!filter.arrival || flight.arrivalDateTime === filter.arrival) &&
        (!filter.search ||
          flight.origin.toLowerCase().includes(filter.search.toLowerCase()) ||
          flight.destination.toLowerCase().includes(filter.search.toLowerCase()) ||
          flight.company.toLowerCase().includes(filter.search.toLowerCase()))
    )

    setFilteredFlights(filtered)
  }, [flights, filter])

  const filterBookmarkedFlights = useCallback((filterData: FilterFormData) => {
    const hasActiveFilters = Object.values(filterData).some(Boolean)
    if (!hasActiveFilters) {
      setFilteredBookmarkedFlights(bookmarkedFlights)
      return
    }
    const filtered = bookmarkedFlights.filter(
      (flight) =>
        (!filterData.origin || flight.origin === filterData.origin) &&
        (!filterData.destination || flight.destination === filterData.destination) &&
        (!filterData.departure || flight.departureDateTime === filterData.departure) &&
        (!filterData.arrival || flight.arrivalDateTime === filterData.arrival) &&
        (!filterData.search ||
          flight.origin.toLowerCase().includes(filterData.search.toLowerCase()) ||
          flight.destination.toLowerCase().includes(filterData.search.toLowerCase()) ||
          flight.company.toLowerCase().includes(filterData.search.toLowerCase()))
    )
    
    setFilteredBookmarkedFlights(filtered)
  }, [bookmarkedFlights])

  const onBookmarksFilterReset = () => {
    setFilteredBookmarkedFlights(bookmarkedFlights)
  }

  useEffect(() => {
    setFilteredBookmarkedFlights(bookmarkedFlights)
  }, [bookmarkedFlights])

  useEffect(() => {
    getFlights()
  }, [getFlights])

  useEffect(() => {
    if (flights.length > 0) getBookmarks()
  }, [flights, getBookmarks])

  useEffect(() => {
    filterFlights()
  }, [filterFlights])

  useEffect(() => {
    const ids = getBookmarksFromStorage();
    if (ids.length > 0 && flights.length > 0) {
      const bookmarkedFlights = flights.filter(f => ids.includes(f.id));
      setBookmarkedFlights(bookmarkedFlights);
    }
  }, [flights]);

  return {
    flights,
    filteredFlights,
    bookmarkedFlights,
    filteredBookmarkedFlights,
    isLoading,
    hasApiError,
    onFilter,
    onFilterReset,
    onToogleBookmarkFlight: toggleBookmark,
    filterBookmarkedFlights,
    onBookmarksFilterReset, // exporta novo handler
  }
}
