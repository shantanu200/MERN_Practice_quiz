import React,{useState} from 'react'
import "./Style.css";

const Instruct = ({setIsQuiz}) => {
  const [isStart,setIsStart] = useState(false);
  return (
    <>
    {!isStart && (<div className='start_btn'><button onClick={() => setIsStart(!isStart)}>Start Quiz</button></div>)}
    {isStart && (
        <div className="info_box">
            <div className="info_title"><span>Rules of Quiz</span></div>
            <div className="info_list">
                <div className="info">1. You will have only <span>60 seconds</span> per each question.</div>
                <div className="info">2. Once you select your answer, it can't be undone.</div>
                <div className="info">3. You can't select any option once time goes off.</div>
                <div className="info">4. You can't exit from the Quiz while you're playing.</div>
                <div className="info">5. You'll get points on the basis of your correct answers.</div>
            </div>
            <div className="buttons">
                <button className="quit">Exit Quiz</button>
                <button className="restart" onClick={() => {setIsQuiz(true)}}>Play Quiz</button>
            </div>
        </div>
    )}
    </>
  )
}

export default Instruct;