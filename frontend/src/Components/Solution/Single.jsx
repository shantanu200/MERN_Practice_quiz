import React,{useState,useEffect} from 'react'
import {useLocation} from "react-router-dom";
import getUsername from '../../AllUserData';
import { queData, userData } from '../../api/Data';
import {postMark} from "../../api/PostData";

const Single = () => {
  const location = useLocation();
  let path = location.pathname.split("/")[2];
  let index = path.slice(-1);
  path = path.slice(0,-1);

  const [ques,setQues] = useState();
  const [user,setUser] = useState();
  const [selectId,setSelectId] = useState("");
  const [isClicked,setIsClicked] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try{
        const data = await queData(path);
        setQues(data);

        const udata = await userData();
        setUser(udata);
      }catch(error){
        console.log(error);
      }
    }
    getData();
  },[]);
  
  function handleBtn(id){
    console.log(id);
    setIsClicked(!isClicked);
    try{
      const markData = {
        username: getUsername(),
        qid: id
      }
      const response = postMark(markData);
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
  }
  
  return (
    <>
    <div>
    <h5>Question: {ques?.question}</h5>
    <h5>Options: </h5>
    {ques?.options?.map((val,index) => {
      return(
        <p key={index}>{val.id}. {val.text}</p>
      )
    })}
    <h5>Answer: {ques?.options?.[ques?.answer-1].text}</h5>
    <button onClick={() => {handleBtn(ques?._id)}}>{(user?.markedquestions?.includes(ques?._id)) ? "Unmark Question" : "Mark Question"}</button>
    </div>
    <h5>Solution: </h5>
    <p>{ques?.solution}</p>
    <div>
      <h5>Your Solution:</h5>
      <p>{(user?.binaryAnswers?.[index]) ? "Correct" : "Incorrect" }</p>
      <h5>Time Taken: </h5>
      <p>{user?.timeTaken?.[index]} sec</p>
    </div>
    </>
  )
}

export default Single