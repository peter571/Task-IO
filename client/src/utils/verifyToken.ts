/**Check if token in Valid */

type func = () => void;

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export const authVerify = () => {

    const user = JSON.parse(localStorage.getItem("account_user")!);
    if (user && user !== 'undefined') {
      const decodedJwt = parseJwt(user.token);
      
      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem("account_user");
        return false;
      } else {
        return true;
      }
    } else {
        return false;
    }
}