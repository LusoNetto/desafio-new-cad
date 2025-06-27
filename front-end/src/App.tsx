import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

// PAGES
import { Flights } from '@/pages'

import { Bookmarks } from '@/pages'

// COMPONENTS
import { Navbar } from '@/components/Navbar'

// STYLES
import { GlobalStyle, theme } from './styles'
import { GenericError } from './components'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Navigate to="/flights" />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/bookmarks" element={<Bookmarks />} />

          <Route
            path="*"
            element={<GenericError message="Página não encontrada" />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
