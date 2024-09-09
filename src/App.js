import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import DiningRoom from './Pages/Diningroom';
import Hall from './Pages/Hall';
import LivingRoom from './Pages/Livingroom';
import Kitchen from './Pages/Kitchen';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
