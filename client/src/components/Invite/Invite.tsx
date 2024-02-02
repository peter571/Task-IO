import React, { useEffect } from "react";
import { useValidateMemberInviteMutation } from "features/api/workspaceApi";
import { useLazyGetUserQuery } from "features/api/authApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Register from "components/Auth/Register";
import { useAccountContext } from "context/AccountContext";
import Login from "components/Auth/Login";
import Loader from "components/Loader/Loader";
import config from "config";

export default function Invite() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const [validateMemberInvite] = useValidateMemberInviteMutation();
  const [fetchUser, { isLoading: loadingUser }] = useLazyGetUserQuery();
  const navigate = useNavigate();
  const { hasAccount, setHasAccount } = useAccountContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Validate token
        const url =
          import.meta.env.MODE === "production"
            ? config.LIVE_API_URL
            : config.DEV_API_URL;
        const { data } = await axios.get(`${url}/spaces/validate-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userPayload = await fetchUser(data.user_email).unwrap();
        setHasAccount(true);
        await validateMemberInvite({
          token,
          userId: userPayload._id,
        }).unwrap();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (loadingUser) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-screen">{hasAccount ? <Login /> : <Register />}</div>
  );
}
