import { useTheme } from 'styled-components'

import * as S from './styles'

export const ScreenLoader = () => {
  const { COLORS } = useTheme()

  return (
    <S.ScreenLoaderContainer>
      <S.Overlay />
      <S.Loader color={COLORS.PRIMARY_LIGHTEST} size={24} />
    </S.ScreenLoaderContainer>
  )
}
