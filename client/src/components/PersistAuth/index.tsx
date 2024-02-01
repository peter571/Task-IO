import React, { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";
import {
  selectCurrentToken,
  setCredentials,
} from "../../features/api/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import socket from "../../socket/socket";
import Loader from "../Loader/Loader";

const PersistAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const acessToken = useAppSelector(selectCurrentToken);
  const [token, setToken] = useState(acessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const res = await refresh();
        setToken(res.accessToken);
        dispatch(
          setCredentials({
            user: { ...res.user },
            token: res.accessToken,
          })
        );
        socket.auth = {
          userID: res.user.userId,
          sessionID: res.user.userId,
        };
        socket.connect();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !token ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistAuth;
