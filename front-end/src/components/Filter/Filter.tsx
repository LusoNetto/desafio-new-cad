import { useForm } from "react-hook-form";
import type { FilterDataType } from "../../pages/Flights/types/FilterDataType";
import { convertDataBaseDateToFormDate } from "../../utils/dateConverter";
import type { FlightType } from "../../pages/Flights/types/FlightType";
import api from "../../services/api";
import type { FilterType } from "./types/FilterType";
import useFlight from "../../pages/Flights/hooks/useFlight";
import { Button } from "../Button/Button";
import { InputContainer } from "../InputContainer/InputContainer";
import { Label } from "../Label/Label";
import { SubmitConteiner } from "../SubmitConteiner/SubmitConteiner";
import { Select } from "../Select/Select";
import { Form } from "../Form/Form";
import { Container } from "../Container/Container";
import { Input } from "../Input/Input";

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
      <Form>
        <InputContainer>
          <Label>Search:
            <Input {...register("search")} type="search" id="default-search" placeholder="Digite aqui..." required />
            <Button
              color="blue"
              type="submit"
              onClick={handleSubmit((data) => onFilter(data as FilterDataType))}
            >
              Pesquisar
            </Button>
          </Label>
        </InputContainer>
        <Container>
          <InputContainer>
            <Label>Origem:
              <Select
                {...register("origin")}
              >
                <option value="Selecione">Selecione</option>
                <option value="São Paulo">São Paulo</option>
                <option value="Minas Gerais">Minas Gerais</option>
                <option value="Espirito Santo">Espirito Santo</option>
                <option value="Bahia">Bahia</option>
              </Select>
            </Label>
          </InputContainer>
          <InputContainer>
            <Label>
              Destino:
              <Select
                {...register("destination")}
              >
                <option value="Selecione">Selecione</option>
                <option value="São Paulo">São Paulo</option>
                <option value="Minas Gerais">Minas Gerais</option>
                <option value="Espirito Santo">Espirito Santo</option>
                <option value="Bahia">Bahia</option>
              </Select>
            </Label>
          </InputContainer>
        </Container>
        <InputContainer>
          <Label>
            Partida:
            <Input
              type="date"
              {...register("departure")}
            />
          </Label>
        </InputContainer>
        <InputContainer>
          <Label>
            Chegada:
            <Input
              type="date"
              {...register("arrival")}
            />
          </Label>
        </InputContainer>
        <SubmitConteiner>
          <Button
            color="grey"
            onClick={handleSubmit(onResetTable)}
          >
            Limpar pesquisa
          </Button>
          <Button
            color="green"
            type="submit"
            onClick={handleSubmit((data) => onFilter(data as FilterDataType))}
          >Filtrar</Button>
        </SubmitConteiner>
      </Form>
    </>
  )
}

export default Filter;