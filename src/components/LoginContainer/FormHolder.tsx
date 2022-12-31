import React, { useState, Dispatch, SetStateAction } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const FormHolder = () => {
  const [flipForms, setFlipForms] = useState<boolean>(true);
  const [disableSwitchBtn, setDisableSwitchBtn] = useState<boolean>(false);

  return (
    <div className="form-holder">
      {!disableSwitchBtn && (
        <button
          className="form-switch"
          onClick={() => {
            setFlipForms(!flipForms);
          }}
        >
          {flipForms ? "Sign In" : "Register"}
        </button>
      )}

      {flipForms ? (
        <RegisterForm
          setDisableSwitchBtn={setDisableSwitchBtn}
          setFlipForms={setFlipForms}
        />
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default FormHolder;
