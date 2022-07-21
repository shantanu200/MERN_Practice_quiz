import React,{useState} from 'react'
import ConfirmationPage from './ConfirmationPage';
import Instruct from './Instruct';
import Quiz from './Quiz';
import ResultBox from './ResultBox';
import "./Style.css";

const Main = ({user}) => {
  const [isQuiz,setIsQuiz] = useState(false);
  return (
    <div className='main'>
    {!isQuiz && (<Instruct setIsQuiz={setIsQuiz} />)}
    {isQuiz && (<Quiz user={user} />)}
    </div>
  )
}

export default Main