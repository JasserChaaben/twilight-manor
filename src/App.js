import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import DiningRoom from './Pages/Diningroom';
import Hall from './Pages/Hall';
import LivingRoom from './Pages/Livingroom';
import Kitchen from './Pages/Kitchen';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { useCookies } from 'react-cookie';

function App() {
  const [player, setplayer] = useCookies(['username']);
  console.log(player.username)
  return (
    <div className="App">
    {!player.username?
    <Router> 
     <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
     </Routes>
     </Router>:
    <Router> 
     <Header />
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
