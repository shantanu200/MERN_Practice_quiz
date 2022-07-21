import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Form_Container = styled.div`
    height: 50vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`


const Input = styled.input`
padding: 10px 20px;
margin-top: 10px;

`
const Button = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
`
const Alert = styled.div``;

const Auth = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: ""
    });
    const [isLogin,setIsLogin] = useState(false);
    const [isReg,setIsReg] = useState(false);
    const [isShow,setIsShow] = useState(false);
    const [alertText,setAlertText] = useState("");
    const handleField = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleForm = (e) => {
        e.preventDefault();

        if(user.username === ""){
           try{
             axios
               .post("http://localhost:8080/api/login",user)
               .then(res => { 
                setIsShow(true);
                if(res.data.user){
                    setAlertText(res.data.message);
                    handleDBUser(res.data.user);
                    setIsLogin(true);
                }else{
                    setAlertText(res.data);
                }
               })
               .catch(err => console.error(err));
           }catch(err){}
        }
        
        if(user.username!=="" && user.email!=="" && user.password!==""){
        try{
           axios
             .post("http://localhost:8080/api/register",user)
             .then(res => {
                setIsShow(true);
                if(res.data.user){
                   setIsReg(true);
                   setAlertText(res.data.message);
                }else{
                    setAlertText(res.data);
                }
             })
             .catch(err => console.error(err));
        }catch(err){
            console.log(err);
        }
        }
    }

    const handleDBUser = (user) => {
        window.localStorage.setItem("LoggedUser",JSON.stringify(user));
        navigate("/gui");
    }

    return (
        <>
        {isShow && (
            <Alert className={(isLogin || isReg) ? 'alert alert-success' : "alert alert-danger"} role="alert" >
               {alertText}
            </Alert>
        )}

        <Form_Container>
            <Form onSubmit={handleForm}>
                <Input name='username' placeholder='Username' onChange={handleField} />
                <Input name='email' placeholder='Email' onChange={handleField}/>
                <Input name='password' type={"password"} placeholder='Password' onChange={handleField}/>
                <Button type='submit'>Submit</Button>
            </Form>
        </Form_Container>

        <Form_Container>
            <Form onSubmit={handleForm}>
                <Input name='email' type={"email"} placeholder='Email' onChange={handleField} />
                <Input name='password' type={"password"} placeholder='Password' onChange={handleField} />
                <Button type='submit'>Submit</Button>
            </Form>
        </Form_Container>
        </>
    )
}

export default Auth