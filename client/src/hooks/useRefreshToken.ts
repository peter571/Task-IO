import { useAccountContext } from "../context/AccountContext";
import axios from "../features/api/axios";

const useRefreshToken = () => {
  const { setUser } = useAccountContext();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    setUser({
      ...response.data,
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
