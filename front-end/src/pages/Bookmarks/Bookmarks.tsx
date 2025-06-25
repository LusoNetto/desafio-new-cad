import { useEffect, useState } from 'react';
import api from '../../services/api';
import Error from '../Error/Error';
import type { FlightType } from '../Flights/types/FlightType';
import FlightsTable from '../../components/FlightsTable/FlightsTable';
import useFlight from '../Flights/hooks/useFlight';
import Filter from '../../components/Filter/Filter';
import { Title } from '../../components/Title/Title';

const Bookmarks = () => {
  const [flights, setFlights] = useState([] as FlightType[]);
  const [bookmarks, setBookmarks] = useState(
    localStorage.getItem('bookmarks') || '{}'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrorApi, setHasErrorApi] = useState(false);
  
  const {hasBookmark} = useFlight();

  const heads = [
    'Número do voo',
    'Companhia',
    'Origem',
    'Destino',
    'Partida',
    'Chegada',
    'Preco',
    '',
  ];

  useEffect(() => {
    api
      .get('/flights')
      .then((response) => {
        setIsLoading(false);
        setFlights(response.data.filter((row: FlightType) => hasBookmark(row.id)));
      })
      .catch((err) => {
        setHasErrorApi(true);
        console.error('error:' + err);
      });
  }, [bookmarks]);

  return (
    <>
      {!hasErrorApi ? (
        <>
          <Title>Bookmarks</Title>
          <Filter setFlights={setFlights} setIsLoading={setIsLoading} setHasErrorApi={setHasErrorApi} inBookmarksPage />
          <br />
          <FlightsTable
            heads={heads}
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
  );
};

export default Bookmarks;
