import { Button, Modal } from "flowbite-react";
import React, { SetStateAction, useRef, useState } from "react";
import { useInviteMemberMutation } from "../../features/api/workspaceApi";
import { useAccountContext } from "../../context/AccountContext";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function InviteMember({
  show,
  setOpenInviteMemberModal,
}: {
  show: boolean | undefined;
  setOpenInviteMemberModal: React.Dispatch<SetStateAction<boolean | undefined>>;
}) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccesText] = useState("");
  const [inviteMember, { isLoading }] = useInviteMemberMutation();
  const { spaceId } = useWorkSpaceContext();
  const { user } = useAccountContext();

  return (
    <Modal show={show} onClose={() => setOpenInviteMemberModal(undefined)}>
      <Modal.Header>
        <span className="text-custom-blue">Invite new member to team</span>
      </Modal.Header>
      <Modal.Body>
        {successText && (
          <h1 className="text-green-500 font-bold bg-green-200 w-1/2 p-3 my-1 rounded-md">
            {successText}
          </h1>
        )}
        <div className="space-y-6">
          <input
            className="form__input py-2 w-1/2"
            type="email"
            name="email"
            placeholder="Enter email"
            ref={emailRef}
            onFocus={() => {
              setSuccesText("");
              setErrorText("");
            }}
            required
          />
        </div>
        {errorText && (
          <h1 className="text-red-500 font-bold inline-block">{errorText}</h1>
        )}
      </Modal.Body>
      <Modal.Footer className="">
        <button
          type="button"
          onClick={async () => {
            if (
              emailRef.current?.value &&
              emailRegexPattern.test(emailRef.current.value)
            ) {
              await inviteMember({
                admin_id: user.userId,
                workspace_id: spaceId,
                user_email: emailRef.current?.value,
              })
                .unwrap()
                .then((payload) => {
                  setErrorText("");
                  setSuccesText("Sent Successfully!");
                  emailRef.current ? (emailRef.current.value = null!) : "";
                })
                .catch((error) => {
                  console.log(error);
                  setErrorText("An error occured! Try again.");
                });
            } else {
              setErrorText("Enter a valid email!");
            }
          }}
          disabled={isLoading}
          className="btn"
        >
          Invite
        </button>
      </Modal.Footer>
    </Modal>
  );
}
