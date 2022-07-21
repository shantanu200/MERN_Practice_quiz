import React,{useState,useEffect} from 'react';
import axios from "axios";


const Quiz = () => {
   
  const [score,setScore] = useState(0);
  const [seconds,setSeconds] = useState(Infinity);
  const [isActive,setIsActive] = useState(true);
  const [isOver,setIsOver] = useState(false);
  const [rQue,setRque] = useState([]);
  const [noque,setNoque] = useState(10); 
  const [queDis,setQueDis] = useState(1);
  const [queIndex,setQueIndex] = useState([0]);
  const [currque,setCurrque] = useState(0);
  const [binAns,setBinAns] = useState([]);
  const [timeTaken,setTimetken] = useState([]);
  const [postData,setPostData] = useState({
    username:"",
    score:0,
    totalque:0,
    binaryAnswers:[],
    timeTaken:[],
    queIndex:[],
  });
  const [isPost, setIsPost] = useState(false);
  
  useEffect(() => {
    let interval = null;
    if(isActive && seconds>0){
      interval = setInterval(() => {
        setSeconds(seconds => seconds-1);
      },1000);
    }else if(!isActive && seconds!==0){
      clearInterval(interval);
    }else{
      handleTimeOver();
    }
    return () => clearInterval(interval);
  },[isActive,seconds]);

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
      setTimetken([...timeTaken,seconds]);
      setCurrque(nextque);
    }
    else if(queDis === noque){
      checkAnswer(currque,uans);
      setTimetken([...timeTaken,seconds]);
      setIsPost(true);
      setIsOver(true);
    }
    console.log(`Currque ${currque}`);
    console.log(`QueDis ${queDis}`);
    setQueDis(queDis+1);
    setSeconds(Infinity);
  }

  function handleTimeOver(){
    let nextque = Math.floor(Math.random()*rQue.length);
    if(queDis<noque){
      setCurrque(nextque);
      setSeconds(5);
    }else{
      setIsOver(true);
    }
    setQueDis(queDis+1);
  }
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/fetchall")
      .then(res => setRque(res.data))
      .catch(err => console.error(err))
  },[]);

  
  
  function handlePost(){
    setPostData({
      username: "shantanu_18",
      score:score,
      totalque:noque,
      binaryAnswers:binAns,
      timeTaken:timeTaken,
      queIndex:queIndex
    });

    try{
      axios.post("http://localhost:8080/api/saveScore",postData)
      .then((res) => {
        console.log(res.data)
      }).catch((err) => {});
    }catch(err) {}
  }

  
  

  return (
    <>
    {console.log(queIndex)}
    {console.log(binAns)}
    {console.log(timeTaken)}
    {console.log(postData)}
    {!isOver && (
    <div className='quiz-box'>
    <h1>Time is remaining {seconds} </h1>
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
        <>
         <h1>Quiz is Over & Score is {score} / {noque} </h1>
        </>
      )
    }
    </>
  )
}

export default Quiz;