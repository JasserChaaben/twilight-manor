import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './Components/Header';
import DiningRoom from './Pages/Diningroom';
import Hall from './Pages/Hall';
import LivingRoom from './Pages/Livingroom';
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Kitchen from './Pages/Kitchen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);

reportWebVitals();
