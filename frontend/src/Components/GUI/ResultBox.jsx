import React, { useEffect,useState } from 'react'
import "./Style.css";

const ResultBox = ({score,noque}) => {
  const [emjText,setEmjText] = useState({
    text: "",
    emj: ""
  });
  const TextEmj = [{text:"Perfect!",emj:"👑"},{text:"Excellent!",emj:"🥳"},{text:"Very Good!",emj:"😍"},{text:"Good!",emj:"👍"},{text:"Sad!",emj:"😥"}];
  
  useEffect(() => {
    let fscore = noque * 4;
    if(score === fscore){
      setEmjText(TextEmj[0]);
    }
    else if(score>=(fscore*0.75)){
      setEmjText(TextEmj[1]);
    }else if(score>=(fscore*0.5) && score<(fscore*0.75)){
      setEmjText(TextEmj[2]);
    }else if(score>=(fscore*0.25) && score<(fscore*0.5)){
      setEmjText(TextEmj[3]);
    }else if(score<(fscore*0.25)){
      setEmjText(TextEmj[4]);
    }
  },[emjText])

  return (
    <div className='result_box'>
        <div className="icon">
            <i className='fa-solid fa-crown'></i>
        </div>
        <div className='complete_text'>
            You completed the Quiz!
        </div>
        <div className="score_text"><span>and {emjText.text} {emjText.emj}, You got <p> {score} </p> out of <p> {noque*4} </p></span></div>
        <div className="buttons">
            <button className="exit">Quit Quiz</button>
            <button className="solution">Quiz Solution</button>
        </div>
    </div>
  )
}

export default ResultBox