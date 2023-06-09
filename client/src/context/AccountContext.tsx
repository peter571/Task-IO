import { createContext, useState, useContext } from "react";
import { ProviderProp } from "../types";
import { getUserDetails } from "../utils/getUserDetails";

interface AccountProp {
  hasAccount: boolean;
  changeHasAccount: () => void;
  user: any
  setUser: React.Dispatch<React.SetStateAction<any>>
}

const AccountContext = createContext<AccountProp>({} as AccountProp);

export const useAccountContext = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }: ProviderProp) => {
  const [hasAccount, setHasAccount] = useState(false);
  const [user, setUser] = useState(getUserDetails())

  const changeHasAccount = () => setHasAccount((prev) => !prev);

  return (
    <AccountContext.Provider value={{ hasAccount, changeHasAccount, user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};
