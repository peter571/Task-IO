import { createContext, useState, useContext } from "react";
import { ProviderProp } from "../types";
import { selectCurrentToken, selectCurrentUser } from "../features/api/authSlice";
import { useAppSelector } from "../hooks/redux";

interface AccountProp {
  hasAccount: boolean;
  changeHasAccount: () => void;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  // persist: boolean
  // setPersist: React.Dispatch<any>

}

const AccountContext = createContext<AccountProp>({} as AccountProp);

export const useAccountContext = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }: ProviderProp) => {
  const [hasAccount, setHasAccount] = useState(false);
  const userData = useAppSelector(selectCurrentUser)
  const [user, setUser] = useState(userData);

  const changeHasAccount = () => setHasAccount((prev) => !prev);
 

  return (
    <AccountContext.Provider
      value={{ hasAccount, changeHasAccount, user, setUser, setHasAccount }}
    >
      {children}
    </AccountContext.Provider>
  );
};
