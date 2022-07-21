import React, { useEffect,useState } from 'react';
import './App.css';
import {Routes,Route} from "react-router-dom";
import AddQ from './Components/AddQ/AddQ';
import Quiz from './Components/Quiz/Quiz';
import Main from './Components/GUI/Main';
import Auth from './Components/Auth/Auth';

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
    </Routes>
  );
}

export default App;
