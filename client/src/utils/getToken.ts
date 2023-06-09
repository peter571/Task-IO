// Function to retrieve the token from localStorage
export const getTokenFromLocalStorage = (): string | null => {
    const user = localStorage.getItem('account_user');
    if (typeof user === 'string') {
      const userToken = JSON.parse(user);
      return userToken.token;
    }
    return null;
  };