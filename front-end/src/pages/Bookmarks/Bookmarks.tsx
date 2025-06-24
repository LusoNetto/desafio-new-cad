import { useEffect, useState } from 'react';
import api from '../../services/api';
import Error from '../Error/Error';
import type { flightType } from '../../types/flightType';
import { convertDataBaseDateToFormDate } from '../../utils/dateConverter';
import Table from '../../components/Table/Table';
import useFlight from '../../hooks/useFlight';

const Bookmarks = () => {
  const [flights, setFlights] = useState([]);
  const [bookmarks, setBookmarks] = useState(
    localStorage.getItem('bookmarks') || '{}'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrorApi, setHasErrorApi] = useState(false);
  const [bookmarkFilterForm, setBookmarkFilterForm] = useState({
    origin: 'São Paulo',
    destination: 'São Paulo',
    departureDateTime: '',
  });
  const [bookmarkSearchForm, setBookmarkSearchForm] = useState('');
  
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

  const handleFilterBookmarksSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await api
      .get('/flights')
      .then((response) => {
        setIsLoading(false);
        const returnedFights = response.data;
        const filteredBookmarks = returnedFights.filter(
          (bookmark: flightType) =>
            bookmark.origin === bookmarkFilterForm.origin &&
            bookmark.destination === bookmarkFilterForm.destination &&
            convertDataBaseDateToFormDate(bookmark.departureDateTime) ===
            bookmarkFilterForm.departureDateTime
        );
        setFlights(filteredBookmarks);
      })
      .catch((err) => {
        setHasErrorApi(true);
        console.error('error:' + err);
      });
  };

  const handleSearchBookmarksSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await api
      .get('/flights')
      .then((response) => {
        setIsLoading(false);
        const returnedFights = response.data;
        const filteredBookmarks = returnedFights.filter(
          (bookmark: flightType) => {
            return (
              bookmark.flightNumber.toString() === bookmarkSearchForm ||
              bookmark.company.toString() === bookmarkSearchForm ||
              bookmark.origin.toString() === bookmarkSearchForm ||
              bookmark.destination.toString() === bookmarkSearchForm ||
              bookmark.departureDateTime.toString() === bookmarkSearchForm ||
              bookmark.price.toString() === bookmarkSearchForm
            );
          }
        );
        setFlights(filteredBookmarks);
      })
      .catch((err) => {
        setHasErrorApi(true);
        console.error('error:' + err);
      });
  };

  const handleClearSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await api
      .get('/flights')
      .then((response) => {
        setIsLoading(false);
        setFlights(response.data);
      })
      .catch((err) => {
        setHasErrorApi(true);
        console.error('error:' + err);
      });
  };

  useEffect(() => {
    api
      .get('/flights')
      .then((response) => {
        setIsLoading(false);
        setFlights(response.data.filter((row: flightType) => hasBookmark(row.id)));
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
          <h1>Bookmarks</h1>
          <form onSubmit={handleFilterBookmarksSubmit}>
            <label>
              Origem:
              <select
                name="origem"
                onChange={(e) =>
                  setBookmarkFilterForm((prev) => ({
                    ...prev,
                    origin: e.target.value,
                  }))
                }
                defaultValue="São Paulo"
              >
                <option value="São Paulo">São Paulo</option>
                <option value="Minas Gerais">Minas Gerais</option>
                <option value="Espirito Santo">Espirito Santo</option>
                <option value="Bahia">Bahia</option>
              </select>
            </label>
            <label>
              Destino:
              <select
                name="destino"
                onChange={(e) =>
                  setBookmarkFilterForm((prev) => ({
                    ...prev,
                    destination: e.target.value,
                  }))
                }
                defaultValue="São Paulo"
              >
                <option value="São Paulo">São Paulo</option>
                <option value="Minas Gerais">Minas Gerais</option>
                <option value="Espirito Santo">Espirito Santo</option>
                <option value="Bahia">Bahia</option>
              </select>
            </label>
            <label>
              Data:
              <input
                type="date"
                name="data"
                onChange={(e) => {
                  setBookmarkFilterForm((prev) => ({
                    ...prev,
                    departureDateTime: e.target.value,
                  }));
                }}
              />
            </label>
            <input
              type="submit"
              value="Filtrar"
              disabled={
                !bookmarkFilterForm.origin ||
                !bookmarkFilterForm.destination ||
                !bookmarkFilterForm.departureDateTime
              }
            />
          </form>
          <form onSubmit={handleSearchBookmarksSubmit}>
            <label>
              Pesquisar:
              <input
                name="pesquisar"
                onChange={(e) => setBookmarkSearchForm(() => e.target.value)}
                placeholder="Digite aqui..."
              />
            </label>
            <input
              type="submit"
              value="Pesquisar"
              disabled={!bookmarkSearchForm}
            />
          </form>
          <button onClick={handleClearSearch}>Limpar pesquisa</button>
          <br />
          <Table
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
