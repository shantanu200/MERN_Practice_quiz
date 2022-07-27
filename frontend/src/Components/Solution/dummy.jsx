import React, { useState, useEffect } from 'react'
import { userData } from '../../api/Data';
import axios from 'axios';


const Dummy = () => {
  const [user, setUser] = useState([]);
  const [isCorrect,setIsCorrect] = useState(false);
  const [timeTaken,setTimeTaken] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await userData();
        if(data.binaryAnswers[2] === 1){
          setIsCorrect(true);
        }
        setTimeTaken(data.timeTaken[0]);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);


  return (
    <div>
    <h1>{user.username}</h1>
    <h1>{isCorrect ? "Correct" : "Incorrect"}</h1>
    <h1>{timeTaken} / 10</h1>
    </div>
  )
}

export default Dummy