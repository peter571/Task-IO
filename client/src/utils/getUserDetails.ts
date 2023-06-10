export function getUserDetails() {
  const user = localStorage.getItem("account_user");
  
  if (!user) return null
  if (typeof user === "string" && user !== 'undefined') {
    return JSON.parse(user).user;
  } else {
    return null;
  }
}
