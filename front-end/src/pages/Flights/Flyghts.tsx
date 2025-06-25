import { useEffect, useState } from 'react';
import api from '../../services/api';
import Error from '../Error/Error';
import type { FlightType } from './types/FlightType';
import { convertDataBaseDateToFormDate } from '../../utils/dateConverter';
import Table from '../../components/Table/Table';
import { useForm } from 'react-hook-form';
import type { FilterDataType } from './types/FilterDataType';
import Filter from '../../components/Filter/Filter';
import { Title } from '../../components/Title/title';

const Flights = () => {
  const [flights, setFlights] = useState([] as FlightType[]);
  const [bookmarks, setBookmarks] = useState(
    localStorage.getItem('bookmarks') || '{}'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrorApi, setHasErrorApi] = useState(false);


  const heads = [
    'Número do voo',
    'Companhia',
    'Origem',
    'Destino',
    'Partida',
    'Chegada',
    'Preco',
    'Favorito',
    '',
  ];

  useEffect(() => {
    api
      .get('/flights')
      .then((response) => {
        setIsLoading(false);
        setFlights(response.data);
      })
      .catch((err) => {
        setHasErrorApi(true);
        console.error('error:' + err);
      });
  }, []);

  return (
    <>
      {!hasErrorApi ? (
        <>
          <Title>Flights</Title>
          <Filter setFlights={setFlights} setHasErrorApi={setHasErrorApi} setIsLoading={setIsLoading} />
          <br />
          <Table heads={heads} isLoading={isLoading} rows={flights} bookmarks={bookmarks} setBookmarks={setBookmarks} />
        </>
      ) : (
        <Error pageOfError="Flights" />
      )}
    </>
  );
};

export default Flights;
