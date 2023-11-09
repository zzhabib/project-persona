

import React from 'react';
import './App.css';
import Navbar from './components/navBar';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';


    

import PersonasPage from './pages/personasPage';
import StoriesPage from './pages/storiesPage';
import TestPage from './pages/testPage';
import HomePage from './pages/homePage';
import ScenesPage from './pages/scenesPage';


require('dotenv').config();





function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/stories' element={<StoriesPage />} />
          <Route exact path='/personas' element={<PersonasPage />} />
          <Route exact path='/scenes' element={<ScenesPage />} />
          <Route exact path='/test' element={<TestPage />} />
         
            </Routes>
      </Router>
      

      
    );
}
 
export default App;
