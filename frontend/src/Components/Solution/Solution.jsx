import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import axios from 'axios';
import getUsername from '../../AllUserData';
import { useNavigate } from 'react-router-dom';
import { getAllQues,userData,queData} from '../../api/Data';

const Solution = () => {
  let count = 0;
  const [username, setUsername] = useState(getUsername());
  const [quizData, setQuizData] = useState([]);
  const [user, setUser] = useState([]);
  const [queIndex, setQueIndex] = useState([]);
  const [binAnswer, setBinAnswer] = useState([]);
  const [timeTaken, setTimeTaken] = useState([]);

  const navigate = useNavigate();
   useEffect(() => {
    const getData = async () => {
      try{
         const questions = await getAllQues();
         setQuizData(questions);
      }catch(error){
        console.log(error)
      }
    };

    getData()
  },[]);

  useEffect(() => {
    const getData = async () => {
      try{
         const user = await userData();
         setQueIndex(user.queIndex);
         setBinAnswer(user.binaryAnswers);
         setTimeTaken(user.timeTaken);
      }catch(error){
        console.log(error);
      }
    }
    getData();
  },[]);

  
  function handlebtn(id,index) {
    navigate(`/solution/${id+index}`);
  }

  
  return (
    <>
    {queIndex?.map((val,index) => {
      return(
        <div key={index}>
        <h5>{quizData?.[val]?.question}</h5>
        {quizData?.[val]?.options?.map((oval,okey) => {
          return(
            <p key={okey}>{oval.text}</p>
          )
        })}
        <h5>{quizData?.[val]?.options?.[quizData?.[val]?.answer-1].text}</h5>
        <h5>{(binAnswer?.[index]) ? "Correct" : "Incorrect"}</h5>
        <h5>{timeTaken?.[index]}</h5>
        <button className="btn btn-success" onClick={() => {handlebtn(quizData?.[val]?._id,index)}} >Solution</button>
        </div>
      )
    })}  
    
    </>
  )
}

export default Solution