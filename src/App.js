import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import DiningRoom from "./Pages/Diningroom";
import Hall from "./Pages/Hall";
import LivingRoom from "./Pages/Livingroom";
import Kitchen from "./Pages/Kitchen";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import HeaderTwo from "./Components/HeaderTwo";
import Hallway from "./Pages/Hallway";
import KidsBedroom from "./Pages/KidsBedroom";
import Library from "./Pages/Library";
import MainBedroom from "./Pages/MainBedroom";

function App() {
  const [cookies, setCookie] = useCookies(["username", "floor"]);
  const [loaded, setLoaded] = useState(false);
  const [player, setPlayer] = useState("");
  const [level, setLevel] = useState(0);
  const [gender, setGender] = useState(0);
  const [valid, setValid] = useState(false);

  const LevelUp = () => {
    playerUpdate();
    axios
      .post("http://localhost:8081/level", {
        username: player,
        newLevel: level + 1,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    playerUpdate();
  };

  const playerUpdate = () => {
    axios
      .post("http://localhost:8081/player", { username: cookies.username })
      .then((res) => {
        setPlayer(res.data.username);
        setLevel(res.data.level);
        setGender(res.data.gender);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    console.log(cookies);
    if (!loaded) {
      axios
        .post("http://localhost:8081/player", { username: cookies.username })
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
      {!valid ? (
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      ) : cookies.floor == 1 ? (
        <Router>
          <Header name={player} gender={gender} playerUpdate={playerUpdate} />
          <Routes>
            <Route
              path="/"
              element={
                <Hall
                  goToSecondFloor={() => setCookie("floor", 2, { path: "/" })}
                  name={player}
                  level={level}
                  LevelUp={LevelUp}
                />
              }
            />
            <Route
              path="/hall"
              element={
                <Hall
                  goToSecondFloor={() => setCookie("floor", 2, { path: "/" })}
                  name={player}
                  level={level}
                  LevelUp={LevelUp}
                />
              }
            />
            <Route
              path="/Kitchen"
              element={
                <Kitchen
                  name={player}
                  gender={gender}
                  level={level}
                  LevelUp={LevelUp}
                />
              }
            />
            <Route
              path="/Diningroom"
              element={
                <DiningRoom name={player} level={level} LevelUp={LevelUp} />
              }
            />
            <Route
              path="/livingroom"
              element={
                <LivingRoom name={player} level={level} LevelUp={LevelUp} />
              }
            />
          </Routes>
        </Router>
      ) : (
        <Router>
          <HeaderTwo
            name={player}
            gender={gender}
            playerUpdate={playerUpdate}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Hallway
                  goToSecondFloor={() => setCookie("floor", 1, { path: "/" })}
                  name={player}
                  level={level}
                  LevelUp={LevelUp}
                />
              }
            />
            <Route
              path="/hallway"
              element={
                <Hallway
                  goToSecondFloor={() => setCookie("floor", 1, { path: "/" })}
                  name={player}
                  level={level}
                  LevelUp={LevelUp}
                />
              }
            />
            <Route
              path="/library"
              element={
                <Library
                  name={player}
                  gender={gender}
                  level={level}
                  LevelUp={LevelUp}
                />
              }
            />
            <Route
              path="/kidsbedroom"
              element={
                <KidsBedroom
                  name={player}
                  gender={gender}
                  level={level}
                  LevelUp={LevelUp}
                />
              }
            />
            <Route
              path="/mainbedroom"
              element={
                <MainBedroom name={player} level={level} LevelUp={LevelUp} />
              }
            />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
