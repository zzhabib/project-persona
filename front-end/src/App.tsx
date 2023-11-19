import { Route, Routes } from 'react-router'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './routes/LoginPage'
import NavBar from './components/NavBar'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import StoriesPage from './routes/StoriesPage'
import { Provider } from 'react-redux'
import { store } from './store'

const theme = createTheme({
  palette: {
    primary: {
      main: '#57606f',
      contrastText: '#f1f2f6',
    },
    secondary: {
      main: '#2f3542',
      contrastText: '#f1f2f6',
    },
    background: {
      default: '#f0f0f0',
      paper: '#ffffff',
    },
    text: {
      primary: '#252525',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<StoriesPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
