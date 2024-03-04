import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //const [movies,setmovies]=use

  console.log("movies in context", user?.movies);

  // useEffect(()=>{ hasToken && getuserById()},[user])
  //use effect die überprüft when token gibt (user geändert) =>getuserbyid =>
  //=> backend shicket die update user jede mal gib ein änderung in user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
