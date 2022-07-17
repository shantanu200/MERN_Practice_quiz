import React,{useState,useEffect} from 'react';
import axios from "axios";


const Quiz = () => {
  const queBank = [
    {que:"Question1",option:[{text:"Option1",id:1},{text:"Option2",id:2},{text:"Option3",id:3},{text:"Option4",id:4}],answer:1},
    {que:"Question2",option:[{text:"Option1",id:1},{text:"Option2",id:2},{text:"Option3",id:3},{text:"Option4",id:4}],answer:2},
    {que:"Question3",option:[{text:"Option1",id:1},{text:"Option2",id:2},{text:"Option3",id:3},{text:"Option4",id:4}],answer:3},
    {que:"Question4",option:[{text:"Option1",id:1},{text:"Option2",id:2},{text:"Option3",id:3},{text:"Option4",id:4}],answer:4},
    {que:"Question5",option:[{text:"Option1",id:1},{text:"Option2",id:2},{text:"Option3",id:3},{text:"Option4",id:4}],answer:1},
  ];
  
  const [currque,setCurrque] = useState(0);
  const [score,setScore] = useState(0);
  const [isOver,setIsOver] = useState(false);
  const [rQue,setRque] = useState([]);
  const [noque,setNoque] = useState(0);
  
  const fQue = [];

  function handleNext(uans){
    let nextQue = Math.floor(Math.random()*rQue.length);
    
    if(noque<10){
      if(currque<rQue.length-1){
        if(rQue[currque].ans===uans){
          setScore(score+1);
        }
        setCurrque(nextQue);
      }
      if(currque===rQue.length-1){
        if(rQue[currque].ans===uans){
          setScore(score+1);
        }
        setIsOver(true);
      }
    }
    
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/fetchall")
      .then(res => setRque(res.data))
      .catch(err => console.error(err))
  },[])

  return (
    <>
    {!isOver && (
    <div className='quiz-box'>
    <div className='que'>
       {
        rQue.slice(currque,currque+1).map((val,key)=>{
          return(
            <span>
            {val.question}
            </span> 
          )
        })  
        }
    </div>
      {rQue.slice(currque,currque+1).map((val,key) => {
        return(
          <div className='options-grp' >
           {val.options.map((oval,okey)=>{
            return(
              <div className='options' key={okey}>
              <span onClick={() => {handleNext(oval.id)}}>{oval.text}</span>
              </div>
            )
           })}
          </div>
        )
      })}
    </div>
    )}
    {
      isOver && (
         <h1>Quiz is Over & Score is {score}</h1>
      )
    }
    </>
  )
}

export default Quiz