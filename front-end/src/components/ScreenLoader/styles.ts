import styled from 'styled-components'
import { BeatLoader } from 'react-spinners'

export const ScreenLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  position: fixed;
  inset: 0;
  z-index: 1000;
`

export const Loader = styled(BeatLoader)`
  position: relative;
  z-index: 1001;
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;

  background-color: rgba(0, 0, 0, 0.5);
`
