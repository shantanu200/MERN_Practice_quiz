import React,{useState,useEffect} from 'react';
import axios from "axios";


const Quiz = () => {
   
  const [score,setScore] = useState(0);
  const [isOver,setIsOver] = useState(false);
  const [rQue,setRque] = useState([]);
  const [noque,setNoque] = useState(10); 
  const [queDis,setQueDis] = useState(1);
  const [queIndex,setQueIndex] = useState([0]);
  const [currque,setCurrque] = useState(0);
  const [binAns,setBinAns] = useState([]);

  let rScore = 0;
  
  function insertIndex(ele){
    setQueIndex([...queIndex,ele]);
  }
  
  function checkAnswer(currque,uans){
    if(rQue[currque].answer === uans){
      setBinAns([...binAns,1]);
      setScore(score+1);
    }else{
      setBinAns([...binAns,0]);
      return;
    }
  }
  
  function handleNext(uans){
    let nextque = Math.floor(Math.random()*rQue.length);
    if(queDis<noque){
      checkAnswer(currque,uans);
      console.log(`Score is ${score}`);
      insertIndex(nextque);
      setCurrque(nextque);
    }
    else if(queDis === noque){
      checkAnswer(currque,uans);
      setIsOver(true);
    }
    console.log(`Currque ${currque}`);
    console.log(`QueDis ${queDis}`);
    console.log(`rScore ${rScore}`);
    setQueDis(queDis+1);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/fetchall")
      .then(res => setRque(res.data))
      .catch(err => console.error(err))
  },[])

  return (
    <>
    {console.log(queIndex)}
    {console.log(binAns)}
    {!isOver && (
    <div className='quiz-box'>
    <h1>Score is {score} </h1>
    <div className='que'>
       {
        rQue.slice(currque,currque+1).map((val,key)=>{
          return(
            <span key={key}>
            {queDis}
            {val.question}
            </span> 
          )
        })  
        }
    </div>
      {rQue.slice(currque,currque+1).map((val,key) => {
        return(
          <div className='options-grp' key={key}>
           {val.options.map((oval,okey)=>{
            return(
              <div className='options' style={{margin: "30px",border:"10px"}} key={okey}>
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
         <h1>Quiz is Over & Score is {score} / {noque} </h1>
      )
    }
    </>
  )
}

export default Quiz;