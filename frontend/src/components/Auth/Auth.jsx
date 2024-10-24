import React from "react";
import AuthForm from "./AuthForm";
import { sendUserAuthRequest } from "../Data/Data";
import { useDispatch } from "react-redux";
import { userActions } from "../../Store/Redux";
const Auth = () => {
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data);
    dispatch(userActions.login());
    localStorage.setItem("userId", data.id);
  };
  const SubmitHandler = (data) => {
    console.log("auth", data);

    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <AuthForm onSubmit={SubmitHandler} isAdmin={false} />
    </div>
  );
};

export default Auth;
