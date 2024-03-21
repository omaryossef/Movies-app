import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [admin, setAdmin] = useState(false);
  if (redirect) {
    console.log("user", user);
    console.log(admin);
  }
  //const [movies,setmovies]=use

  // console.log("movies in context", user?.movies);

  // useEffect(()=>{ hasToken && getuserById()},[user])
  //use effect die überprüft when token gibt (user geändert) =>getuserbyid =>
  //=> backend shicket die update user jede mal gib ein änderung in user

  return (
    <UserContext.Provider
      value={{ user, setUser, redirect, setRedirect, admin, setAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
};
