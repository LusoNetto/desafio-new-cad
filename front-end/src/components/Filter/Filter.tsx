import { useForm, Controller } from "react-hook-form";
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
      <form>
        <div>
          <label>Search</label>
          <input {...register("search")} type="search" id="default-search" placeholder="Digite aqui..." required />
          <button
            type="submit"
            onClick={handleSubmit((data) => onFilter(data as FilterDataType))}
          >
            Pesquisar
          </button>
        </div>
        <br />
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Origem:
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Destino:
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <label className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            Partida:
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="date"
              {...register("departure")}
            />
          </label>
        </div>
        <div className="mb-5">
          <label className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            Chegada:
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="date"
              {...register("arrival")}
            />
          </label>
        </div>
        <br />
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={handleSubmit(onResetTable)}
        >
          Limpar pesquisa
        </button>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="submit"
          onClick={handleSubmit((data) => onFilter(data as FilterDataType))}
        >Filtrar</button>
      </form>
    </>
  )
}

export default Filter;