import { createContext, useState, useContext } from "react";

interface AccountProp {
  hasAccount: boolean;
  changeHasAccount: () => void;
}

interface ProviderProp {
  children: React.ReactNode;
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
