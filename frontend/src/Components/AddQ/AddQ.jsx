import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./AddQ.css";

const AddQ = () => {
  let count = 0;
  const [ques,setQues] = useState([]);
  const [isDeleted,setIsDeleted] = useState(false);
  const [updateUser,setUpdateUser] = useState({
    que: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    ans: 0
  });

  const [question, setQuestion] = useState({
    que: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    ans: 0
  });


  const handleField = (e) => {
    setQuestion({
      ...question,
      [e.target.name] : e.target.value
    })
  }

  const handleForm = (e) => {
    e.preventDefault();

    if (question.ans > 0 && question.ans < 5) {
      try {
        axios.post("http://localhost:8080/api/addque", question)
          .then((res) => {
            window.location.reload(true);
          })
      } catch (err) { console.log(err) }
    } else {
      alert("Invalid Answer");
    }

  }

  const handleDelete = (id) => {
    axios.get(`http://localhost:8080/api/delete/${id}`)
    .then((res) => {
      window.location.reload(true);
    })
  }

  const handleUpdate = (id) => {
    try{
      axios.get(`http://localhost:8080/api/updateUser/${id}`)
      .then((res) => {
        setUpdateUser(res.data);
      })
    }catch(err) {console.log(err)}
  }

  useEffect(() => {
    try{
      axios.get("http://localhost:8080/api/fetchall")
      .then((res) => {
        setQues(res.data);
      })
    }catch(err) {
      console.log(err);
    }
  },[]);

  return (
    <div className='main-body'>
      {isDeleted && (<div class="alert alert-success" role="alert">
      Question is Deleted
</div>)}
      <div className='addQue'> 
      <header>
        <h1>Add Questions</h1>
        {updateUser._id && (<h1>Question is Selected</h1>)}  
      </header>
        <form onSubmit={handleForm}>
          <div className='fields'>
            <label>Question:</label>
            <input name="que" type="text" placeholder='Question' onChange={handleField} value={question.que} />
          </div>
          <div className='fields'>
            <label>Option1:</label>
            <input name="option1" type="text" placeholder='Option1' onChange={handleField} />
          </div>
          <div className='fields'>
            <label>Option2:</label>
            <input name="option2" type="text" placeholder='Option2' onChange={handleField} />
          </div>
          <div className='fields'>
            <label>Option3:</label>
            <input name="option3" type="text" placeholder='Option3' onChange={handleField} />
          </div>
          <div className='fields'>
            <label>Option4:</label>
            <input name="option4" type={"text"} placeholder='Option4' onChange={handleField} />
          </div>
          <div className='fields'>
            <label>Answer:</label>
            <input name="ans" type="Number" placeholder='Answer' onChange={handleField} />
          </div>
          <button type="submit" className='btn btn-success'>Submit</button>
        </form>
      </div>
      <div className='data-table'>
        <h1>Questions Data</h1>
        <table class="table">
          <thead class="table-dark">
           <tr>
            <th>#</th>
            <th>Question</th>
            <th>Options</th>
            <th>Answer</th>
            <th>Action</th>
           </tr>
          </thead>
          <tbody>
            {ques.map((val,key) => {
              return(
                <tr key={key}>
                  <td>{++count}</td>
                  <td>{val.question}</td>
                  <td>{
                  val.options[0].text+ " " + val.options[1].text + " " + val.options[2].text + " " + val.options[3].text 
                  }</td>
                  <td>{val.answer}</td>
                  <td><i class="fa-solid fa-trash" onClick={() => {handleDelete(val._id)}}></i> <i class="fa-solid fa-pen" onClick={() => {handleUpdate(val._id)}}></i></td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default AddQ