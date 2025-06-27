import { WarningCircle } from 'phosphor-react'

import * as S from './styles'

export interface GenericErrorProps {
  message?: string
}

export const GenericError = (props: GenericErrorProps) => {
  const {
    message = 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.',
  } = props

  return (
    <S.GenericErrorContainer>
      <WarningCircle size={24} weight="bold" />
      <h1>{message}</h1>
    </S.GenericErrorContainer>
  )
}
