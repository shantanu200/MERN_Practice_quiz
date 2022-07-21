import React,{useState} from 'react';
import ResultBox from './ResultBox';


const ConfirmationPage = ({handlePostData,score,noque}) => {
  const [showResult,setShowResult] = useState(false);
  return (
    <>
    {!showResult && (<div className='confirm_box'>
        <div className='complete_text'>
            <span>Your Quiz is Over!!</span> Click submit button
            <div className='alert_text'>
                <span>Do not Refresh these page</span>
            </div>
            <div className="buttons">
                <button className='exit' onClick={() => {
                  handlePostData();
                  setShowResult(true);
                }}>Submit Quiz</button>
            </div>
        </div>
    </div>)}
    {showResult && (
      <ResultBox score={score} noque={noque} />
    )}
    </>
  )
}

export default ConfirmationPage