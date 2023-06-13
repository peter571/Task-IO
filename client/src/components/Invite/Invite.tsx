import React, { useEffect } from "react";
import { useValidateMemberInviteMutation } from "../../features/api/workspaceApi";
import { useGetUserQuery } from "../../features/api/authApi";
import axios from "axios";

export default function Invite() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const [validateMemberInvite] = useValidateMemberInviteMutation();

  useEffect(() => {
    (async () => {
      axios
        .get("http://localhost:5000/spaces/validate-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          
          console.log(data);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  return <div className="h-screen flex  justify-center items-center"></div>;
}
