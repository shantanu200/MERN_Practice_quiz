import axios from "axios";
import getUsername from "../AllUserData";

const url = `http://localhost:8080/api`;

export const postMark = (pData) => {
    let  username = getUsername();
    try{
      const postData = axios.post(`${url}/markquestion`,pData)
      return postData.data;
    }catch(error){
        return error;
    }
};