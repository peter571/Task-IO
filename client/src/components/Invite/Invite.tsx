import React, { useEffect } from "react";
import { useValidateMemberInviteMutation } from "../../features/api/workspaceApi";

export default function Invite() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const [validateMemberInvite] = useValidateMemberInviteMutation();

  useEffect(() => {
    (async () => {
      await validateMemberInvite({ token })
        .unwrap()
        .then((payload) => {
            console.log(payload)
        });
    })();
  }, []);

  return <div className="h-screen flex  justify-center items-center"></div>;
}
