// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SingleRecipePage from './components/SingleRecipePage';
import RecipeEntities from './components/entities';
import AddEntity from './components/AddEntityPage';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/single' element={<SingleRecipePage/>}/>
        <Route path='/entities' element={<RecipeEntities/>}/>
        <Route path='/add-entities' element={<AddEntity/>}/>


      </Routes>
    </Router>
  )
}

export default App
