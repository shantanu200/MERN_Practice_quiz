import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import styled from 'styled-components';
import "./Single.css";
import getUsername from '../../AllUserData';
import { queData, userData } from '../../api/Data';


const Single = () => {
  const location = useLocation();
  const [username,setUsername] = useState(getUsername());
  const [user,setUser] = useState({});
  const [squestion,setSQuestion] = useState({});
  const [soptions,setSOptions] = useState([]);
  const [solution,setSolution] = useState("");
  const [isClicked,setIsClicked] = useState(false);

  const [score,setScore] = useState(0);
  const [isCorrect,setIsCorrect] = useState([]);
  const [timeTaken,setTimeTaken] = useState([]);  

  let path = location.pathname.split("/")[2];
  
 

  useEffect(() => {
    const getData = async () => {
      try {
        const que = await queData(path);       
        setSQuestion(que);
        setSOptions(que.options);
        setSolution(que.solution);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  },[]);
  
  useEffect(() => {
    const getData = async () => {
      try{
        const user = await userData();
        setUser(user);
        setIsCorrect(user.binaryAnswers);
        setTimeTaken(user.timeTaken);
      }catch(error) {
        console.log(error);
      }
    }
    getData();
  })
  

  const handleButton = () => {
    setIsClicked(!isClicked);
  }

  const handleCorrect = (id) => {
    console.log(id);
  }

  return (
    <div className="sol-container">
      <div className="sol-box">
       <header>
       </header>
       <div className="left">
        <section>
          <div className="que_text">
            {squestion?.question}
          </div>
          <div className="option_list">
            {soptions.map((val,index) => {
              if(val.id === squestion.answer){
              return(
                 <div className="option correct">
                  <span>{val.text}</span>
                 </div>
              )
              }else{
              return(
                 <div className="option">
                  <span>{val.text}</span>
                 </div>
              )
              }
            })}
          </div>
          <div className="sol-buttons">
          <button className='mark-btn' style={{background: isClicked ? "#ff2c2c" : "#039be5" , border: isClicked ? "#ff2c2c" : "#039be5"}} onClick={handleButton}>{isClicked ? "Unmark Question" : "Mark Question"}</button>
          </div>
        </section>
       </div>
       <div className="right">
        <div className="content">
          <div className="content-title">
            Solution: 
          </div>
          <div className="content-text">
            <h5 style={{whiteSpace:"pre-line"}} >{solution}</h5>
          </div>
        </div>
       </div>
       <div className="foot">
        <h5></h5>
      </div>
      </div> 
    </div>
  )
}

export default Single