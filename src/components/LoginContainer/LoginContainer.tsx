import React from "react";
import FormHolder from "./FormHolder";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const ClassName = {
  loginContainer: "login-container",
} as const;

const LoginContainer = () => {
  return (
    <div className="login-container">
      <FormHolder />
    </div>
  );
};

export default LoginContainer;
