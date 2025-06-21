import { useEffect, useState } from "react";
import api from "../../services/api";
import Table from "../../components/Table";
import Error from "../Error/Error";
import type { flightType } from "../../types/flightType";
import { convertDataBaseDateToFormDate } from "../../utils/dateConverter";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [hasErrorApi, setHasErrorApi] = useState(false);
  const [flightFilterForm, setFlightFilterForm] = useState({
    origin: "São Paulo",
    destination: "Bahia",
    departureDateTime: ""
  });

  const heads = [
    "Número do voo",
    "Companhia",
    "Origem",
    "Destino",
    "Partida",
    "Chegada",
    "Preco",
    "Favorito",
    ""
  ]

  useEffect(() => {
    api
      .get("/flights")
      .then((response) => {
        setIsloading(false);
        setFlights(response.data)
      })
      .catch((err) => {
        setHasErrorApi(true);
        console.error("error:" + err);
      });
  }, []);

  const handleFilterFlightsSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const filteredFlights = flights.filter((flight : flightType) => flight.origin === flightFilterForm.origin && flight.destination === flightFilterForm.destination && convertDataBaseDateToFormDate(flight.departureDateTime) === flightFilterForm.departureDateTime)
    setFlights(filteredFlights);
  }

  return (
    <>
      <h1>Flights</h1>
      {
        !hasErrorApi ?
          (
            <>
              <form onSubmit={handleFilterFlightsSubmit}>
                <label>
                  Origem:
                  <select
                    name="origem"
                    onChange={(e) =>
                      setFlightFilterForm((prev) => ({ ...prev, origin: e.target.value }))
                    }>
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
                      setFlightFilterForm((prev) => ({ ...prev, destination: e.target.value }))
                    }>
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
                    onChange={(e) =>{
                      setFlightFilterForm((prev) => ({ ...prev, departureDateTime: e.target.value }))}}
                  />
                </label>
                <input type="submit" value="Filtrar" />
              </form>

              <Table heads={heads} isLoading={isLoading} rows={flights} />
            </>
          ) :
          (
            <Error pageOfError="Flights" />
          )
      }
    </>
  );
};

export default Flights;