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
import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [username, setUsername] = useCookies(['username']);
  const [loaded,setLoaded] = useState(false);
  const [player, setPlayer] =useState('');
  const [level, setLevel] =useState(0);
  const [gender, setGender] =useState(0);
  const [valid,setValid] = useState(false);
  const LevelUp = () =>{
    playerUpdate();
    axios.post('http://localhost:8081/level', {username:player,newLevel:level+1})
    .then(res => console.log(res.data))
    .catch(err => console.log(err));

    playerUpdate();
  }
  
  const playerUpdate = ()=>{
    axios
        .post('http://localhost:8081/player', { username: username.username })
        .then((res) => {
          setPlayer(res.data.username);
          setLevel(res.data.level);
          setGender(res.data.gender);
        })
        .catch((err) => console.log(err));
  }
  useEffect(() => {
    if (!loaded) {
      axios
      .post('http://localhost:8081/player', { username: username.username })
      .then((res) => {
        setPlayer(res.data.username);
        setLevel(res.data.level);
        setGender(res.data.gender);
        if (res.data.username) setValid(true);
      })
      .catch((err) => console.log(err));
      setLoaded(true);
    }
  }, []);
  
  return (
    <div className="App">
    {!valid?
    <Router> 
     <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
     </Routes>
     </Router>:
    <Router> 
     <Header name={player} gender={gender} playerUpdate={playerUpdate}/>
     <Routes>
      <Route path='/' element={<Hall name={player} level={level} LevelUp={LevelUp}/>}/>
      <Route path='/hall' element={<Hall name={player} level={level} LevelUp={LevelUp}/>}/>
      <Route path='/Kitchen' element={<Kitchen name={player} level={level}/>}/>
      <Route path='/Diningroom' element={<DiningRoom name={player} level={level}/>}/>
      <Route path='/livingroom' element={<LivingRoom name={player}level={level}/>}/>
     </Routes>
     </Router>
     }
    </div>
  );
}

export default App;
