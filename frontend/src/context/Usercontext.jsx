import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { URL } from "../url.js";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const getUser = async() => {
    try {
      const res = await axios.get(`${URL}/api/auth/refresh` , {withCredentials:true});
      setUser(res.data);
    } 
    catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    getUser();
  },[])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};