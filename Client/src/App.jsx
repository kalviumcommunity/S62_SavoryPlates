// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SingleRecipePage from './components/SingleRecipePage';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/single' element={<SingleRecipePage/>}/>

      </Routes>
    </Router>
  )
}

export default App
