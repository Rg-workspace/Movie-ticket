import React from "react";
import AuthForm from "../Auth/AuthForm";
import { sendAdminAuthRequest } from "../Data/Data";
import { useDispatch } from "react-redux";
import { adminActions } from "../../Store/Redux";
const Admin = () => {
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("AdminId", data.id);
    localStorage.setItem("Token", data.token);
  };
  const SubmitHandler = (data) => {
    console.log("admin", data);
    sendAdminAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return <AuthForm onSubmit={SubmitHandler} isAdmin={true} />;
};

export default Admin;
