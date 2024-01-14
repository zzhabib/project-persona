import { Route, Routes } from 'react-router'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './routes/LoginPage'
import PersonaPage from './routes/PersonaPage'
import ScenePage from './routes/ScenePage'
import NavBar from './components/NavBar'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import HomePage from './routes/HomePage'
import { Provider } from 'react-redux'
import { store } from './store'
import RequireAuth from './components/RequireAuth'
import StoryPage from './routes/StoryPage'

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

            <Route path="/" element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            } />

            <Route path="/story/:storyId" element={
              <RequireAuth>
                <StoryPage />
              </RequireAuth>
            } />

            <Route path="/persona/:Id" element={
              <RequireAuth>
                <PersonaPage />
              </RequireAuth>
            } />

            <Route path="/scene/:Id" element={
              <RequireAuth>
                <ScenePage />
              </RequireAuth>
            } />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
