import React,{useState} from 'react'
import axios from "axios";

const AddQ = () => {
  const [question,setQuestion] = useState({
    que:"",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    ans: 0
  });

  const handleField = (e) => {
     setQuestion({
      ...question,
      [e.target.name]:e.target.value
     });
  }

  const handleForm = (e) => {
    e.preventDefault();
    
    if(question.ans>0 && question.ans<5){
      try{
        axios.post("http://localhost:8080/api/addque",question)
        .then((res) => {
           console.log(res.data);
        })
      }catch(err){console.log(err)}
    }else{
      alert("Invalid Answer");
    }

  }

  return (
    <div className='addQue'>
      <form onSubmit={handleForm}>
        <div>
        <label>Question:</label>
        <input name="que" type="text" placeholder='Question' onChange={handleField} />
        </div>
        <div>
        <label>Option1:</label>
        <input name="option1" type="text" placeholder='Option1' onChange={handleField} />
        </div>
        <div>
        <label>Option2:</label>
        <input name="option2" type="text" placeholder='Option2' onChange={handleField} />
        </div>
        <div>
        <label>Option3:</label>
        <input name="option3" type="text" placeholder='Option3' onChange={handleField} />
        </div>
        <div>
        <label>Option4:</label>
        <input name="option4" type={"text"} placeholder='Option4' onChange={handleField}/>
        </div>
        <div>
        <label>Answer:</label>
        <input name="ans" type="Number" placeholder='Answer' onChange={handleField}/>
        </div>
        <button type="submit" >Submit</button>
      </form>
    </div>
  )
}

export default AddQ