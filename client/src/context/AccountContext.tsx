import { createContext, useState, useContext } from "react";
import { ProviderProp } from "../types";

interface AccountProp {
  hasAccount: boolean;
  changeHasAccount: () => void;
}

const AccountContext = createContext<AccountProp>({} as AccountProp);

export const useAccountContext = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }: ProviderProp) => {
  const [hasAccount, setHasAccount] = useState(false);

  const changeHasAccount = () => setHasAccount((prev) => !prev);

  return (
    <AccountContext.Provider value={{ hasAccount, changeHasAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
