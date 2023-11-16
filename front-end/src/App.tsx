import { Route, Routes } from 'react-router'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './routes/LoginPage'
import NavBar from './components/NavBar'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#252525',
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
