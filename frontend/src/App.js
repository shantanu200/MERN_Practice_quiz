import React, { useEffect,useState } from 'react';
import './App.css';
import {Routes,Route} from "react-router-dom";
import AddQ from './Components/AddQ/AddQ';
import Quiz from './Components/Quiz/Quiz';
import Main from './Components/GUI/Main';
import Auth from './Components/Auth/Auth';
import Solution from './Components/Solution/Solution';
import Single from './Components/Solution/Single';
import AddSol from './Components/AddQ/AddSol';
import Dummy from './Components/Solution/dummy';

function App() {
  const [logUser,setLogUser] = useState();

  useEffect(() => {
    const getLogUser = window.localStorage.getItem("LoggedUser");
    setLogUser(JSON.parse(getLogUser))
  },[]);

  return (
    <Routes>
    <Route path='/quiz' element={<Quiz user={logUser} />}  />
    <Route path='/add'  element={<AddQ />} />
    <Route path='/gui'  element={<Main user={logUser} />} />
    <Route path='/user' element={<Auth />}  />
    <Route path='/sol' element={<Solution />} />
    <Route path='/solution/:id' element={<Single />}  />
    <Route path='/sol/:id' element={<AddSol />} />
    </Routes>
  );
}

export default App;
