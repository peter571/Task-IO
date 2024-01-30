import { createContext, useState, useContext } from "react";
import { ProviderProp } from "../types";

interface AccountProp {
  hasAccount: boolean;
  changeHasAccount: () => void;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountContext = createContext<AccountProp>({} as AccountProp);

export const useAccountContext = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }: ProviderProp) => {
  const [hasAccount, setHasAccount] = useState(false);
  const [user, setUser] = useState(null);

  const changeHasAccount = () => setHasAccount((prev) => !prev);

  return (
    <AccountContext.Provider
      value={{ hasAccount, changeHasAccount, user, setUser, setHasAccount }}
    >
      {children}
    </AccountContext.Provider>
  );
};
