import React, { useEffect, useState } from 'react'
import axios from "axios";
import {useLocation} from "react-router-dom"

const AddSol = ({id}) => {
  const [question,setQuestion] = useState({});
  const location = useLocation();
  const [solution,setSolution] = useState("");
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    axios.get(`http://localhost:8080/api/question/${id}`)
    .then((res) => { 
      setQuestion(res.data);
    });
  },[]);
  
  const handleField = (e) => {
    setSolution({
      ...solution,
      [e.target.name] : e.target.value
    })
  }

  const handleButton = () => {
    axios.post(`http://localhost:8080/api/question/solution/${id}`,solution)
    .then((res) => {
      console.log(res.data);
    });

    window.location.reload(true);
  }

  return (
    <div className="addQue">
     <h1>{question.question}</h1>
     <textarea name="solution" id="" cols="50" rows="10" placeholder='Enter your Solution here' onChange={handleField}/>
     <button className='btn btn-success' onClick={handleButton} >Submit</button>
    </div>
  )
}

export default AddSol