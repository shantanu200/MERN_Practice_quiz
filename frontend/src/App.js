import React from 'react';
import './App.css';
import {Routes,Route} from "react-router-dom";
import AddQ from './Components/AddQ/AddQ';
import Quiz from './Components/Quiz/Quiz';

function App() {
  return (
    <Routes>
    <Route path='/quiz' element={<Quiz />}  />
    <Route path='/add'  element={<AddQ />} />
    </Routes>
  );
}

export default App;
