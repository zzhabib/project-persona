
import React from 'react';
import './App.css';
import Navbar from './components/navBar';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
    
import PersonaPage from './pages/personaPage';
import PersonasPage from './pages/personasPage';
import StoryPage from './pages/storyPage';
import StoriesPage from './pages/storiesPage';
import TestPage from './pages/testPage';
import HomePage from './pages/homePage';


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
          <Route exact path='/home' element={<HomePage />} />
          <Route exact path='/stories' element={<StoriesPage />} />
          <Route exact path='/personas' element={<PersonasPage />} />
          <Route exact path='/test' element={<TestPage />} />
         
            </Routes>
      </Router>
      

      
    );
}
 
export default App;
