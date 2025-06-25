import { useForm } from "react-hook-form";
import type { FilterDataType } from "../../pages/Flights/types/FilterDataType";
import { convertDataBaseDateToFormDate } from "../../utils/dateConverter";
import type { FlightType } from "../../pages/Flights/types/FlightType";
import api from "../../services/api";
import type { FilterType } from "./types/FilterType";
import useFlight from "../../pages/Flights/hooks/useFlight";

const Filter = ({ setIsLoading, setFlights, setHasErrorApi, inBookmarksPage }: FilterType) => {
  const { register, handleSubmit } = useForm();
  const { hasBookmark } = useFlight();

  const onFilter = async (data: FilterDataType) => {
    const { origin, destination, departure, arrival, search } = data;
    console.log(origin, destination, departure, arrival, search)
    setIsLoading(true);
    await api
      .get('/flights')
      .then((response) => {
        setIsLoading(false);
        const filteredFlights = response.data.filter(
          (flight: FlightType) =>
            flight.origin === origin ||
            flight.origin === origin ||
            flight.destination === destination ||
            convertDataBaseDateToFormDate(flight.departureDateTime) === departure ||
            convertDataBaseDateToFormDate(flight.arrivalDateTime) === arrival ||
            search === flight.flightNumber.toString() ||
            search === flight.company ||
            search === flight.origin ||
            search === flight.destination ||
            search === new Date(flight.departureDateTime).toLocaleDateString() ||
            search === new Date(flight.arrivalDateTime).toLocaleDateString() ||
            search === flight.price
        );
        console.log(filteredFlights);
        setFlights(filteredFlights);
      })
      .catch((err) => {
        setHasErrorApi(true);
        console.error('error:' + err);
      });
  };

  const onResetTable = async () => {
    setIsLoading(true);
    await api
      .get('/flights')
      .then((response) => {
        setIsLoading(false);
        if (inBookmarksPage) {
          setFlights(response.data.filter((row: FlightType) => hasBookmark(row.id)));
        } else {
          setFlights(response.data);
        }
      })
      .catch((err) => {
        setHasErrorApi(true);
        console.error('error:' + err);
      });
  };

  return (
    <>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input {...register("search")} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite aqui..." required />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit((data) => onFilter(data as FilterDataType))} 
            >
              Pesquisar
            </button>
          </div>
        </div>
        <br />
        <div className="mb-5">
          <label>
            Origem:
            <select
              {...register("origin")}
            >
              <option value="Selecione">Selecione</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Minas Gerais">Minas Gerais</option>
              <option value="Espirito Santo">Espirito Santo</option>
              <option value="Bahia">Bahia</option>
            </select>
          </label>
        </div>
        <div className="mb-5">
          <label>
            Destino:
            <select
              {...register("destination")}
            >
              <option value="Selecione">Selecione</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Minas Gerais">Minas Gerais</option>
              <option value="Espirito Santo">Espirito Santo</option>
              <option value="Bahia">Bahia</option>
            </select>
          </label>
        </div>
        <div className="mb-5">
          <label>
            Partida:
            <input
              type="date"
              {...register("departure")}
            />
          </label>
        </div>
        <div className="mb-5">
          <label>
            Chegada:
            <input
              type="date"
              {...register("arrival")}
            />
          </label>
        </div>
        <br />
        <button
          type="submit"
          onClick={handleSubmit((data) => onFilter(data as FilterDataType))}
        >Filtrar</button>
      </form>
      <button onClick={handleSubmit(onResetTable)}>Limpar pesquisa</button>
    </>
  )
}

export default Filter;