import { useCallback, useEffect, useState } from 'react'

// SERVICES
import { FlightsService } from '@/api'

// TYPES
import type { RequestFlightsDto } from '@/api'

export const useFlight = () => {
  const [flights, setFlights] = useState([] as RequestFlightsDto[])
  const [bookmarks, setBookmarks] = useState('{}')

  const [hasApiError, setHasApiError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const hasBookmark = (id: number) => {
    const bookmarksObject = JSON.parse(
      localStorage.getItem('bookmarks') || '{}',
    )
    return (
      typeof bookmarksObject[id] === 'string' &&
      (bookmarksObject[id] !== null || bookmarksObject[id] !== undefined)
    )
  }

  const getFlights = useCallback(async () => {
    try {
      setIsLoading(true)

      const flights = await FlightsService.getFlights()

      setFlights(flights)
    } catch (error) {
      console.error('error:' + error)
      setHasApiError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getLocalStorageBookmarks = useCallback(async () => {
    const bookmarks = localStorage.getItem('bookmarks')
    setBookmarks(bookmarks || '{}')
  }, [])

  useEffect(() => {
    getLocalStorageBookmarks()
  }, [getLocalStorageBookmarks])

  useEffect(() => {
    getFlights()
  }, [getFlights])

  return {
    hasBookmark,
    flights,
    isLoading,
    hasApiError,
    bookmarks,
    setBookmarks,
  }
}
