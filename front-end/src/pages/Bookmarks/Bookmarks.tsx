import { useEffect, useState } from 'react'
import { api } from '../../api/core/axios-api'
import Error from '../Error/Error'
import type { FlightType } from '../Flights/types'
import { useFlight } from '../Flights/useFlight'

// COMPONENTS
import { FlightsTable, Filter, Title } from '@/components'

// CONSTANTS
import { FLIGHTS_TABLE_HEADS } from '@/constants'

const Bookmarks = () => {
  const [flights, setFlights] = useState([] as FlightType[])
  const [bookmarks, setBookmarks] = useState(
    localStorage.getItem('bookmarks') || '{}',
  )
  const [isLoading, setIsLoading] = useState(true)
  const [hasErrorApi, setHasErrorApi] = useState(false)

  const { hasBookmark } = useFlight()

  useEffect(() => {
    api
      .get('/flights')
      .then((response) => {
        setIsLoading(false)
        setFlights(
          response.data.filter((row: FlightType) => hasBookmark(row.id)),
        )
      })
      .catch((err) => {
        setHasErrorApi(true)
        console.error('error:' + err)
      })
  }, [bookmarks])

  return (
    <>
      {!hasErrorApi ? (
        <>
          <Title>Bookmarks</Title>
          <Filter
            setFlights={setFlights}
            setIsLoading={setIsLoading}
            setHasErrorApi={setHasErrorApi}
            inBookmarksPage
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
        <Error pageOfError="Bookmarks" />
      )}
    </>
  )
}

export default Bookmarks
