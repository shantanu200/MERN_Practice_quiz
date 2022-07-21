import React, { useState, useEffect, useRef } from 'react'
import "./Style.css";
import axios from "axios";
import ResultBox from "./ResultBox";
import ConfirmationPage from './ConfirmationPage';

const Quiz = ({user}) => {
    const [seconds,setSeconds] = useState(10);
    const [isActive,setIsActive] = useState(true);
    const [que, setQue] = useState([]);
    const [isOver, setIsOver] = useState(false);
    const [currque, setCurrque] = useState(0);
    const [score, setScore] = useState(0);
    const [noque, setNoque] = useState(10);
    const [queDis, setQueDis] = useState(1);
    const [queIndex,setQueIndex] = useState([0]);
    const [binAns,setBinAns] = useState([]);
    const [timeTaken,setTimetken] = useState([]);
    
    
    useEffect(() => {
       let interval = null;
       if(isActive && seconds>0){
          interval = setInterval(() => {
            setSeconds(seconds => seconds-1);
          },1000);
       }else if(!isActive && seconds!=0){
          clearInterval(interval);
       }else{
          handleTimeOver();
       }
       return () => clearInterval(interval);
    },[isActive,seconds]);


    useEffect(() => {
        async function getData() {
            await axios.get("http://localhost:8080/api/fetchall")
                .then((res) => {
                    setQue(res.data);
                });
        }
        getData();
    }, []);

    

    const checkAns = (currque, uans) => {
        if (que[currque].answer === uans) {
            setBinAns([...binAns,1]);
            setScore(score + 4);
        } else {
            setBinAns([...binAns,0]);
            setScore(score - 1);
        }
    }

    const handleNext = (uans) => {
        let nextque = Math.floor(Math.random() * que.length); 
        if (queDis < noque) {
            checkAns(currque,uans);
            setQueIndex([...queIndex,nextque]);
            setCurrque(nextque);
        } else if (queDis === noque) {
            checkAns(currque,uans);
            setIsOver(true);
        }
        setTimetken([...timeTaken,10-seconds]);
        setQueDis(queDis + 1);
        setSeconds(10);
    }

    const handleBtn = () => {
        let nextque = Math.floor(Math.random() * que.length);
        setCurrque(nextque);
    }

    const handleTimeOver = () => {
        let nextque = Math.floor(Math.random()*que.length);
        if(queDis<noque){
            setCurrque(nextque);
            setBinAns([...binAns,"s"]);
            setSeconds(10);
        }else{
            setIsOver(true);
        }
        setQueDis(queDis+1);
    }

    function handleLastEvent(uans){
        checkAns(currque,uans);
    }

    function handlePostData(){
        const userQuizData = {
        username:user.username,
        score:score,
        totalque:noque,
        binaryAnswers:binAns,
        timeTaken:timeTaken,
        queIndex:queIndex
       };
       
       try {
        axios.post("http://localhost:8080/api/saveScore",userQuizData)
        .then((res) => {
            console.log(res.data);
        })
       } catch (error) {}
    }

    return (
        <>
            {!isOver && (
                <div className='quiz_box'>
                    <header>
                        <div className="title">Quizzer</div>
                        <div className="timer">
                            <div className="time_left_txt">
                                Time Left
                            </div>
                            <div className="timer_sec">{seconds}</div>
                        </div>
                        {/* <div className="time_line" style={{width:`${width}px`}}></div> */}
                    </header>
                    <section>
                        {que.slice(currque, currque + 1).map((val, key) => {
                            return (
                                <div className="que_text" key={key}>
                                    {queDis} .
                                    {val.question}
                                </div>
                            )
                        })
                        }
                        {que.slice(currque, currque + 1).map((val, key) => {
                            return (
                                <div className="option_list" key={key}>
                                    {val.options.map((oval, okey) => {
                                        return (
                                            <div className='option' key={okey}>
                                                <span onClick={() => handleNext(oval.id)}>{oval.text}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </section>
                    <footer>
                        <div className="total_que"><span><p>{queDis}</p> of <p>{noque}</p> Questions</span></div>
                        <button className='next_btn' onClick={handleBtn} >Next Que</button>
                    </footer>
                </div>
            )}
            {isOver && (
                <>
                <ConfirmationPage handlePostData={handlePostData} noque={noque} score={score}  />
               </>
            )}
        </>

    )
}

export default Quiz;