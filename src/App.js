import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import DiningRoom from './Pages/Diningroom';
import Hall from './Pages/Hall';
import LivingRoom from './Pages/Livingroom';
import Kitchen from './Pages/Kitchen';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { useState } from 'react';

function App() {
  const [player,setPlayer]=useState(null);
  return (
    <div className="App">
    {!player?
    <Router> 
     <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
     </Routes>
     </Router>:
    <Router> 
     <Header/>
     <Routes>
      <Route path='/' element={<Hall/>}/>
      <Route path='/hall' element={<Hall/>}/>
      <Route path='/Kitchen' element={<Kitchen/>}/>
      <Route path='/Diningroom' element={<DiningRoom/>}/>
      <Route path='/livingroom' element={<LivingRoom/>}/>
     </Routes>
     </Router>
     }
    </div>
  );
}

export default App;
