// STYLES
import * as S from './styles'

// TYPES
import type { FilterProps, FilterDataType } from './types'
import { MagnifyingGlass, Trash } from 'phosphor-react'
import { useForm } from 'react-hook-form'

export const Filter = (props: FilterProps) => {
  const { onFilter, onFilterReset } = props

  const { register, handleSubmit } = useForm<FilterDataType>()

  return (
    <S.FilterContainer>
      <S.FormContainer>
        {/* <Label>
            Search:
            <Input
              {...register('search')}
              type="search"
              id="default-search"
              placeholder="Digite aqui..."
              required
            />
            <Button
              color="blue"
              type="submit"
              onClick={handleSubmit((data) => onFilter(data as FilterDataType))}
            >
              Pesquisar
            </Button>
          </Label> */}

        <S.InputsContainer>
          <S.InputContainer>
            <S.Label>Origem:</S.Label>
            <S.Select {...register('origin')}>
              <option value="Selecione">Selecione</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Minas Gerais">Minas Gerais</option>
              <option value="Espirito Santo">Espirito Santo</option>
              <option value="Bahia">Bahia</option>
            </S.Select>
          </S.InputContainer>

          <S.InputContainer>
            <S.Label>Destino:</S.Label>
            <S.Select {...register('destination')}>
              <option value="Selecione">Selecione</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Minas Gerais">Minas Gerais</option>
              <option value="Espirito Santo">Espirito Santo</option>
              <option value="Bahia">Bahia</option>
            </S.Select>
          </S.InputContainer>

          <S.InputContainer>
            <S.Label>Partida em:</S.Label>
            <S.Input type="date" {...register('departure')} />
          </S.InputContainer>

          <S.InputContainer>
            <S.Label>Chegada em:</S.Label>
            <S.Input type="date" {...register('arrival')} />
          </S.InputContainer>

          <S.Button type="submit" onClick={handleSubmit(onFilter)}>
            <MagnifyingGlass size={18} />
            Buscar
          </S.Button>

          <S.ResetButton type="button" onClick={onFilterReset}>
            <Trash size={18} />
          </S.ResetButton>
        </S.InputsContainer>
      </S.FormContainer>
    </S.FilterContainer>
  )
}
