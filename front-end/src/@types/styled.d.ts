/* eslint-disable @typescript-eslint/no-empty-object-type */

import 'styled-components'

import { theme } from '@/styles'

type ThemeType = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
