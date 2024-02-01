import { useAccountContext } from "context/AccountContext";
import axios from "features/api/axios";

const useRefreshToken = () => {
  const { setUser } = useAccountContext();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    setUser({
      ...response.data.user,
    });
    return response.data;
  };
  return refresh;
};

export default useRefreshToken;
