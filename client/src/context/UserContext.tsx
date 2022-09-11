import { createContext, useState } from "react";
import { GlobalUser, UserContextProp } from "../types";

export const UserContext = createContext({} as GlobalUser);

export const UserContextProvider = ({ children }: UserContextProp) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
