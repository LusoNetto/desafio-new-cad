import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router'

// PAGES
import { Flights } from '@/pages'

import { Bookmarks } from '@/pages'

// COMPONENTS
import { Navbar } from '@/components/Navbar'

// STYLES
import { GlobalStyle, theme } from './styles'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/flights" element={<Flights />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
