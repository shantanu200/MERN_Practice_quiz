import axios from "axios";
import getUsername from "../AllUserData";

const url = `http://localhost:8080/api`;

export const userData = async () => {
    let username = getUsername();
    try {
       const response = await axios.get(`${url}/userData/${username}`);
       return response.data[0];
    } catch (error) {
      return error
    }
};

export const queData = async (id) => {
   try{
      const response = await axios.get(`${url}/solution/${id}`)
      return response.data;
   }catch(error){
    return error;
   }
}

export const getAllQues = async () => {
   try{
      const response = await axios.get(`${url}/fetchall`);
      return response.data;
   }catch(error){
      return error;
   }
}



