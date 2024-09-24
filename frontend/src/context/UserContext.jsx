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

  return (
    <UserContext.Provider
      value={{ user, setUser, redirect, setRedirect, admin, setAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
};
